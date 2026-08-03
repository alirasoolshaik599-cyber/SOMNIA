import { memo } from "react";
import type { EveningReflectionEntry } from "@/types/sleep";

type ReflectionEntryRowProps = {
  entry: EveningReflectionEntry;
  onDelete: (id: string) => void;
};

function ReflectionEntryRow({ entry, onDelete }: ReflectionEntryRowProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-md sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{entry.date}</p>
          {entry.text && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{entry.text}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          aria-label={`Delete reflection from ${entry.date}`}
          className="flex min-h-[44px] shrink-0 items-center rounded-full border border-white/10 bg-black/30 px-3.5 text-xs text-slate-300 transition-all duration-300 active:scale-95 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(ReflectionEntryRow);