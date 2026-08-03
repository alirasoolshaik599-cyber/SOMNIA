"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import type { AwarenessExercise } from "@/types/awareness";

type AwarenessExerciseCardProps = {
  exercise: AwarenessExercise;
  doneToday: boolean;
  onComplete: (id: string) => void;
};

function AwarenessExerciseCard({ exercise, doneToday, onComplete }: AwarenessExerciseCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.01] hover:border-[#5B6EFF]/20 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{exercise.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{exercise.description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-400">
          {exercise.durationLabel}
        </span>
      </div>

      <div className="mt-5">
        <Button
          variant={doneToday ? "outline" : "primary"}
          size="sm"
          onClick={() => onComplete(exercise.id)}
          disabled={doneToday}
        >
          {doneToday ? "✓ Completed Today" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
}

export default memo(AwarenessExerciseCard);