import { createServerFn } from "@tanstack/react-start";

export type LiveItem = {
  id: string;
  title: string;
  date: string;
  source: string;
  url: string;
};

export type LiveBundle = {
  fetchedAt: string;
  register: LiveItem[];
  error?: string;
};

const FR_URL =
  "https://www.federalregister.gov/api/v1/documents.json?per_page=8&order=newest&conditions%5Bterm%5D=South+Africa";

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export const getLiveSignals = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveBundle> => {
    try {
      const res = await fetch(FR_URL, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        return {
          fetchedAt: new Date().toISOString(),
          register: [],
          error: `Federal Register ${res.status}`,
        };
      }
      const json = (await res.json()) as {
        results?: Array<{
          document_number?: string;
          title?: string;
          publication_date?: string;
          html_url?: string;
          type?: string;
          agencies?: Array<{ name?: string }>;
        }>;
      };
      const register: LiveItem[] = (json.results ?? []).map((d) => ({
        id: asString(d.document_number) || asString(d.html_url),
        title: asString(d.title),
        date: asString(d.publication_date),
        source: d.agencies?.[0]?.name || asString(d.type) || "Federal Register",
        url: asString(d.html_url),
      }));
      return { fetchedAt: new Date().toISOString(), register };
    } catch (err) {
      return {
        fetchedAt: new Date().toISOString(),
        register: [],
        error: err instanceof Error ? err.message : "Feed unavailable",
      };
    }
  },
);

export type EnvoyLiveItem = LiveItem & { mission: "us" | "sa" };

export type EnvoyLiveBundle = {
  fetchedAt: string;
  items: EnvoyLiveItem[];
  errors: string[];
};

const ENVOY_FEEDS: { mission: "us" | "sa"; url: string; source: string }[] = [
  {
    mission: "us",
    source: "US Embassy Pretoria",
    url: "https://za.usembassy.gov/feed/",
  },
  {
    mission: "us",
    source: "Google News · Bozell",
    url: "https://news.google.com/rss/search?q=%22Brent+Bozell%22+OR+%22L.+Brent+Bozell%22+South+Africa&hl=en-US&gl=US&ceid=US:en",
  },
  {
    mission: "sa",
    source: "Google News · Meyer",
    url: "https://news.google.com/rss/search?q=%22Roelf+Meyer%22+(ambassador+OR+Washington+OR+embassy)&hl=en-US&gl=US&ceid=US:en",
  },
];

const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";
const APOS = "&#39;";

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replaceAll(AMP, "&")
    .replaceAll(LT, "<")
    .replaceAll(GT, ">")
    .replaceAll(QUOT, '"')
    .replaceAll(APOS, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m?.[1] ? decodeXml(m[1]) : "";
}

function parseRss(
  xml: string,
  mission: "us" | "sa",
  fallbackSource: string,
): EnvoyLiveItem[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return blocks.slice(0, 8).map((block, i) => {
    const title = tag(block, "title");
    const link = tag(block, "link") || tag(block, "guid");
    const pub = tag(block, "pubDate") || tag(block, "published");
    const d = pub ? new Date(pub) : new Date();
    const date = Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
    const source = tag(block, "source") || fallbackSource;
    return {
      id: link || `${mission}-${i}-${title}`,
      title,
      date,
      source,
      url: link,
      mission,
    };
  });
}

export const getEnvoySignals = createServerFn({ method: "GET" }).handler(
  async (): Promise<EnvoyLiveBundle> => {
    const errors: string[] = [];
    const items: EnvoyLiveItem[] = [];
    const results = await Promise.allSettled(
      ENVOY_FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, {
          headers: {
            accept: "application/rss+xml, application/xml, text/xml, */*",
            "user-agent": "CapeSignal/1.0 (open-source desk)",
          },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`${feed.source} ${res.status}`);
        const xml = await res.text();
        return parseRss(xml, feed.mission, feed.source);
      }),
    );
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const feed = ENVOY_FEEDS[i];
      if (r.status === "fulfilled") items.push(...r.value);
      else
        errors.push(
          `${feed?.source}: ${r.reason instanceof Error ? r.reason.message : "failed"}`,
        );
    }
    const seen = new Set<string>();
    const deduped = items.filter((it) => {
      const key = (it.url || it.title).toLowerCase();
      if (!it.title || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    deduped.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return { fetchedAt: new Date().toISOString(), items: deduped.slice(0, 16), errors };
  },
);
