import EmptyState from "@/components/ui/EmptyState";
import type { RealityCheck } from "@/types/awareness";

type TodayCompletedListProps = {
  completedToday: RealityCheck[];
};

export default function TodayCompletedList({ completedToday }: TodayCompletedListProps) {
  if (completedToday.length === 0) {
    return <EmptyState icon="🌙" message="No reality checks practiced yet today." compact />;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
      <ul className="space-y-2">
        {completedToday.map((rc) => (
          <li key={rc.id} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="text-[#a9b3ff]" aria-hidden="true">
              ✓
            </span>
            {rc.label}
          </li>
        ))}
      </ul>
    </div>
  );
}