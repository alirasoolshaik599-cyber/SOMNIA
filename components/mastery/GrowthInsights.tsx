import type { GrowthSummary } from "@/lib/growthSummary";

type GrowthInsightsProps = {
  insights: GrowthSummary["insights"];
};

export default function GrowthInsights({ insights }: GrowthInsightsProps) {
  const cards: { label: string; value: string }[] = [];

  if (insights.mostPracticedTechnique) {
    cards.push({
      label: "Most Practiced Technique",
      value: `${insights.mostPracticedTechnique.label} — ${insights.mostPracticedTechnique.count} session${
        insights.mostPracticedTechnique.count === 1 ? "" : "s"
      }`,
    });
  }

  if (insights.mostFrequentStabilizationMethod) {
    cards.push({
      label: "Most Used Stabilization Method",
      value: `${insights.mostFrequentStabilizationMethod.label} — used ${insights.mostFrequentStabilizationMethod.count} time${
        insights.mostFrequentStabilizationMethod.count === 1 ? "" : "s"
      }`,
    });
  }

  if (insights.longestPracticeStreak !== undefined && insights.longestPracticeStreak > 1) {
    cards.push({
      label: "Longest Practice Streak",
      value: `${insights.longestPracticeStreak} days`,
    });
  }

  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-2 text-lg font-bold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}