import { createFileRoute } from "@tanstack/react-router";
import { ScoringReadme } from "@/components/desk/scoring-readme";

export const Route = createFileRoute("/scoring")({ component: ScoringPage });

function ScoringPage() {
  return <ScoringReadme />;
}
