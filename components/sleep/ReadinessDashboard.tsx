import { computeReadinessState } from "@/lib/sleep";

type ReadinessDashboardProps = {
  routineDoneToday: number;
  routineTotal: number;
  scheduleSummary: string;
  scheduleDurationLabel: string;
  intentionSet: boolean;
  intentionText: string | null;
  relaxationDoneToday: number;
  relaxationTotal: number;
  checklistCompleted: number;
  checklistTotal: number;
};

export default function ReadinessDashboard({
  routineDoneToday,
  routineTotal,
  scheduleSummary,
  scheduleDurationLabel,
  intentionSet,
  intentionText,
  relaxationDoneToday,
  relaxationTotal,
  checklistCompleted,
  checklistTotal,
}: ReadinessDashboardProps) {
  const routineReady = routineTotal > 0 && routineDoneToday === routineTotal;
  const relaxationReady = relaxationDoneToday > 0;
  const checklistReady = checklistTotal > 0 && checklistCompleted === checklistTotal;

  const completedAreas = [routineReady, intentionSet, relaxationReady, checklistReady].filter(
    Boolean
  ).length;

  const readiness = computeReadinessState(completedAreas, 4);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
      <div className="text-center">
        <span className="text-5xl" aria-hidden="true">
          {readiness.emoji}
        </span>
        <p className="mt-3 text-xl font-bold text-white">{readiness.label}</p>
        <p className="mt-1 text-sm text-slate-400">Tonight&apos;s preparation</p>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/25 px-5 py-3">
          <span className="text-sm text-slate-300">Bedtime Routine</span>
          <span className="text-sm font-medium text-white">
            {routineTotal > 0 ? `${routineDoneToday}/${routineTotal} tonight` : "No items yet"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/25 px-5 py-3">
          <span className="text-sm text-slate-300">Sleep Schedule</span>
          <span className="text-sm font-medium text-white">
            {scheduleSummary} · {scheduleDurationLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/25 px-5 py-3">
          <span className="text-sm text-slate-300">Dream Incubation</span>
          <span className="max-w-[60%] truncate text-sm font-medium text-white">
            {intentionSet && intentionText ? `"${intentionText}"` : "Not set yet"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/25 px-5 py-3">
          <span className="text-sm text-slate-300">Evening Relaxation</span>
          <span className="text-sm font-medium text-white">
            {relaxationDoneToday}/{relaxationTotal} done
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/25 px-5 py-3">
          <span className="text-sm text-slate-300">Pre-Sleep Checklist</span>
          <span className="text-sm font-medium text-white">
            {checklistCompleted}/{checklistTotal} ready
          </span>
        </div>
      </div>
    </div>
  );
}