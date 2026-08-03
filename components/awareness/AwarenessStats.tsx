import StatBox from "@/components/ui/StatBox";

type AwarenessStatsProps = {
  realityChecksToday: number;
  realityChecksThisWeek: number;
  exercisesCompleted: number;
  consistencyPercent: number;
  currentStreak: number;
};

export default function AwarenessStats({
  realityChecksToday,
  realityChecksThisWeek,
  exercisesCompleted,
  consistencyPercent,
  currentStreak,
}: AwarenessStatsProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5">
      <StatBox label="Checks Today" value={realityChecksToday} />
      <StatBox label="Checks This Week" value={realityChecksThisWeek} />
      <StatBox label="Exercises Done" value={exercisesCompleted} />
      <StatBox label="Consistency (30d)" value={`${consistencyPercent}%`} />
      <StatBox label="Current Streak" value={currentStreak} />
    </div>
  );
}