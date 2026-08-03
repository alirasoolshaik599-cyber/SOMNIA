"use client";

import { memo } from "react";
import GuidedStepCard from "@/components/ui/GuidedStepCard";
import type { MildStep } from "@/lib/mildContent";

type MildStepCardProps = {
  step: MildStep;
  index: number;
};

function MildStepCard({ step, index }: MildStepCardProps) {
  return (
    <GuidedStepCard
      idPrefix={`mild-step-${step.id}`}
      numberBadge={index + 1}
      title={step.title}
      description={step.explanation}
      expandLabel="Show guidance"
      collapseLabel="Hide guidance"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How to do it
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{step.guidance}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Why it matters
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{step.whyItMatters}</p>
        </div>
      </div>
    </GuidedStepCard>
  );
}

export default memo(MildStepCard);