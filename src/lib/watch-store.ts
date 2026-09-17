import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_HIGHLIGHTS } from "@/data/events";

type WatchState = {
  checked: string[];
  pinned: string[];
  highlighted: string[];
  toggleChecked: (id: string) => void;
  togglePinned: (id: string) => void;
  toggleHighlight: (id: string) => void;
  moveHighlight: (id: string, dir: -1 | 1) => void;
};

export const useWatchStore = create<WatchState>()(
  persist(
    (set) => ({
      checked: [],
      pinned: [],
      highlighted: DEFAULT_HIGHLIGHTS,
      toggleChecked: (id) =>
        set((s) => ({
          checked: s.checked.includes(id)
            ? s.checked.filter((x) => x !== id)
            : [...s.checked, id],
        })),
      togglePinned: (id) =>
        set((s) => ({
          pinned: s.pinned.includes(id)
            ? s.pinned.filter((x) => x !== id)
            : [...s.pinned, id],
        })),
      toggleHighlight: (id) =>
        set((s) => ({
          highlighted: s.highlighted.includes(id)
            ? s.highlighted.filter((x) => x !== id)
            : [...s.highlighted, id],
        })),
      moveHighlight: (id, dir) =>
        set((s) => {
          const i = s.highlighted.indexOf(id);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= s.highlighted.length) return s;
          const next = [...s.highlighted];
          const swap = next[i];
          next[i] = next[j] as string;
          next[j] = swap as string;
          return { highlighted: next };
        }),
    }),
    {
      name: "cape-signal-watch",
      version: 2,
      migrate: (persisted) => {
        const p = (persisted ?? {}) as Partial<WatchState>;
        return {
          checked: p.checked ?? [],
          pinned: p.pinned ?? [],
          highlighted:
            Array.isArray(p.highlighted) && p.highlighted.length > 0
              ? p.highlighted
              : DEFAULT_HIGHLIGHTS,
        };
      },
    },
  ),
);
