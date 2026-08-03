"use client";

import { memo } from "react";
import GuidedStepCard from "@/components/ui/GuidedStepCard";
import type { StabilizationTechnique } from "@/lib/stabilizationContent";

type StabilizationTechniqueCardProps = {
  technique: StabilizationTechnique;
  index: number;
};

function StabilizationTechniqueCard({ technique, index }: StabilizationTechniqueCardProps) {
  return (
    <GuidedStepCard
      idPrefix={`stabilization-technique-${technique.id}`}
      numberBadge={index + 1}
      title={technique.title}
      description={technique.description}
      expandLabel="Why it matters & how to do it"
      collapseLabel="Hide details"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Why it matters
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{technique.whyItMatters}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How to try it
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{technique.howTo}</p>
        </div>
      </div>
    </GuidedStepCard>
  );
}

export default memo(StabilizationTechniqueCard);