"use client";

import { memo } from "react";
import GuidedStepCard from "@/components/ui/GuidedStepCard";
import type { DreamControlTopic } from "@/lib/dreamControlContent";

type DreamControlTopicCardProps = {
  topic: DreamControlTopic;
};

function DreamControlTopicCard({ topic }: DreamControlTopicCardProps) {
  return (
    <GuidedStepCard
      idPrefix={`dream-control-${topic.id}`}
      title={topic.title}
      description={topic.overview}
      expandLabel="Explore this topic"
      collapseLabel="Collapse"
      hoverScale
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Why people experiment with it
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{topic.whyExperiment}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Common approaches
          </p>
          <ul className="mt-2 space-y-2">
            {topic.commonApproaches.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Practical suggestions
          </p>
          <ul className="mt-2 space-y-2">
            {topic.suggestions.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Common challenges
          </p>
          <ul className="mt-2 space-y-2">
            {topic.commonChallenges.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            What to Expect
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{topic.whatToExpect}</p>
        </div>
      </div>
    </GuidedStepCard>
  );
}

export default memo(DreamControlTopicCard);