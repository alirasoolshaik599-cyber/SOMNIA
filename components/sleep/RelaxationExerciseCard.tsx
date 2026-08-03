"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import GuidedStepCard from "@/components/ui/GuidedStepCard";
import type { RelaxationExercise } from "@/types/sleep";

type RelaxationExerciseCardProps = {
  exercise: RelaxationExercise;
  doneToday: boolean;
  onComplete: (id: string) => void;
};

function RelaxationExerciseCard({ exercise, doneToday, onComplete }: RelaxationExerciseCardProps) {
  return (
    <GuidedStepCard
      idPrefix={`relaxation-${exercise.id}`}
      tag={exercise.durationLabel}
      title={exercise.title}
      description={exercise.description}
      expandLabel="Show steps"
      collapseLabel="Hide steps"
      hoverScale
      footer={
        <Button
          variant={doneToday ? "outline" : "primary"}
          size="sm"
          onClick={() => onComplete(exercise.id)}
          disabled={doneToday}
        >
          {doneToday ? "✓ Completed Today" : "Mark Complete"}
        </Button>
      }
    >
      <ol className="space-y-2">
        {exercise.steps.map((step, index) => (
          <li key={index} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span className="shrink-0 font-semibold text-[#a9b3ff]">{index + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </GuidedStepCard>
  );
}

export default memo(RelaxationExerciseCard);