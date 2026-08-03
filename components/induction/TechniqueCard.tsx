"use client";

import { useState, memo } from "react";
import PillLink from "@/components/ui/PillLink";
import type { InductionTechnique } from "@/lib/inductionContent";

const difficultyStyles: Record<InductionTechnique["difficulty"], string> = {
  Beginner: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Intermediate: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Advanced: "border-red-400/30 bg-red-400/10 text-red-300",
};

type TechniqueCardProps = {
  technique: InductionTechnique;
};

function TechniqueCard({ technique }: TechniqueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasExpandableDetail = Boolean(
    technique.detailPoints?.length || technique.learnMoreHref
  );
  const detailId = `technique-detail-${technique.id}`;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.01] hover:border-[#5B6EFF]/20 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{technique.name}</h3>
          <p className="text-sm text-slate-400">{technique.fullName}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              difficultyStyles[technique.difficulty]
            }`}
          >
            {technique.difficulty}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              technique.trainingStatus === "guided"
                ? "border-[#5B6EFF]/30 bg-[#5B6EFF]/10 text-[#a9b3ff]"
                : "border-white/10 bg-black/30 text-slate-400"
            }`}
          >
            {technique.trainingStatus === "guided" ? "Guided Training" : "Overview Available"}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{technique.description}</p>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-300">Practice time:</span>{" "}
          {technique.practiceTime}
        </p>
        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-300">Best for:</span> {technique.bestFor}
        </p>
      </div>

      {hasExpandableDetail && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={detailId}
            className="mt-4 flex min-h-[44px] items-center rounded text-sm font-medium text-[#a9b3ff] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
          >
            {expanded ? "Hide details" : "More details"}
          </button>

          {expanded && (
            <div
              id={detailId}
              className="mt-2 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              {technique.detailPoints && technique.detailPoints.length > 0 && (
                <ul className="space-y-2">
                  {technique.detailPoints.map((point, index) => (
                    <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                      <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                        •
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {technique.learnMoreHref && (
                <PillLink href={technique.learnMoreHref} variant="primary" className="text-sm">
                  {technique.learnMoreLabel ?? "Learn More"}
                </PillLink>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}  

export default memo(TechniqueCard);