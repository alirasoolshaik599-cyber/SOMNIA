import StatBox from "@/components/ui/StatBox";

type DreamStatsProps = {
  totalDreams: number;
  favoriteDreams: number;
  totalTags: number;
  dreamsThisMonth: number;
  longestDreamTitle: string | null;
  longestDreamLength: number;
};

export default function DreamStats({
  totalDreams,
  favoriteDreams,
  totalTags,
  dreamsThisMonth,
  longestDreamTitle,
  longestDreamLength,
}: DreamStatsProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-5">
      <StatBox label="Total Dreams" value={totalDreams} />
      <StatBox label="Favorites" value={favoriteDreams} />
      <StatBox label="Total Tags" value={totalTags} />
      <StatBox label="This Month" value={dreamsThisMonth} />
      <StatBox
        label="Longest Dream"
        value={longestDreamTitle ? `${longestDreamLength} chars` : "—"}
      />
    </div>
  );
}