import type { GuidedSessionEntry } from "@/types/induction";

type ExtraField = { label: string; value: string };

type LastPracticeSummaryProps = {
  lastEntry: GuidedSessionEntry | undefined;
  extraFields?: ExtraField[];
  emptyMessage?: string;
};

export default function LastPracticeSummary({
  lastEntry,
  extraFields = [],
  emptyMessage = "No guided sessions yet. Your first one will appear here.",
}: LastPracticeSummaryProps) {
  if (!lastEntry) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/25 px-6 py-8 text-center backdrop-blur-md">
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-6">
      <p className="mb-4 text-sm text-slate-400">Last guided session</p>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-slate-400">Date</span>
          <span className="text-sm font-medium text-white">{lastEntry.date}</span>
        </div>
        {extraFields.map((field) => (
          <div key={field.label} className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-slate-400">{field.label}</span>
            <span className="max-w-[65%] truncate text-sm font-medium text-white">
              {field.value}
            </span>
          </div>
        ))}
        {lastEntry.readiness && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-slate-400">Readiness</span>
            <span className="text-sm font-medium text-white">{lastEntry.readiness}</span>
          </div>
        )}
        {lastEntry.notes && (
          <div className="border-t border-white/10 pt-3">
            <span className="text-sm text-slate-400">Notes</span>
            <p className="mt-1 text-sm leading-6 text-slate-300">{lastEntry.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}