import StatBox from "@/components/ui/StatBox";
import type { GrowthSummary } from "@/lib/growthSummary";

type GrowthStatsGridProps = {
  counts: GrowthSummary["counts"];
};

export default function GrowthStatsGrid({ counts }: GrowthStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <StatBox label="Dreams Recorded" value={counts.dreamsRecorded} />
      <StatBox label="Awareness Sessions" value={counts.awarenessSessions} />
      <StatBox label="Sleep Preparation" value={counts.sleepPreparationSessions} />
      <StatBox label="MILD Practice" value={counts.mildPractice} />
      <StatBox label="WBTB Practice" value={counts.wbtbPractice} />
      <StatBox label="WILD Practice" value={counts.wildPractice} />
      <StatBox label="Stabilization Practice" value={counts.stabilizationPractice} />
    </div>
  );
}