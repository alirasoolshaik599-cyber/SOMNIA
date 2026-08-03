"use client";

import { memo, useMemo } from "react";
import CheckToggle from "@/components/ui/CheckToggle";
import { computeStreak } from "@/lib/awareness";
import type { RoutineItem } from "@/types/sleep";

type RoutineItemRowProps = {
  item: RoutineItem;
  doneToday: boolean;
  isFirst: boolean;
  isLast: boolean;
  onToggleDoneToday: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
};

function RoutineItemRow({
  item,
  doneToday,
  isFirst,
  isLast,
  onToggleDoneToday,
  onMoveUp,
  onMoveDown,
  onDelete,
}: RoutineItemRowProps) {
  const streak = useMemo(() => computeStreak(item.doneDates), [item.doneDates]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:border-[#5B6EFF]/20 sm:px-6">
      <CheckToggle
        checked={doneToday}
        onToggle={() => onToggleDoneToday(item.id)}
        label={`Mark "${item.label}" as ${doneToday ? "not done" : "done"} tonight`}
      />

      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${
            doneToday ? "text-slate-400 line-through" : "text-white"
          }`}
        >
          {item.label}
        </p>
        {streak > 0 && (
          <p className="text-xs font-medium text-[#a9b3ff]">
            {streak} night{streak === 1 ? "" : "s"} in a row
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onMoveUp(item.id)}
          disabled={isFirst}
          aria-label={`Move "${item.label}" up`}
          className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors duration-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(item.id)}
          disabled={isLast}
          aria-label={`Move "${item.label}" down`}
          className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors duration-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
        >
          ↓
        </button>
        {item.isCustom && (
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete "${item.label}"`}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors duration-300 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(RoutineItemRow);