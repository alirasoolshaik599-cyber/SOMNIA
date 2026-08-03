"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SectionHeading from "@/components/ui/SectionHeading";
import MasteryNav from "@/components/mastery/MasteryNav";
import StabilizationTechniqueCard from "@/components/mastery/StabilizationTechniqueCard";
import PracticeCalendar from "@/components/induction/PracticeCalendar";
import LastPracticeSummary from "@/components/induction/LastPracticeSummary";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import {
  stabilizationIntro,
  whyDreamsEndReasons,
  stabilizationTechniques,
} from "@/lib/stabilizationContent";

const STABILIZATION_SESSIONS_KEY = "somnia_stabilization_sessions";

export default function StabilizationPage() {
  const { hasLoaded, practicedDates, lastEntry } = useGuidedSessionLog(
    STABILIZATION_SESSIONS_KEY,
    "stabilization-session"
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/mastery">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Lucid Dream Stabilization"
            description="Simple, commonly reported ways to help a lucid dream last a little longer."
          />

          <MasteryNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12 space-y-3 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    What it is
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {stabilizationIntro.whatItIs}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Why it matters
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {stabilizationIntro.whyItMatters}
                  </p>
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Why Lucid Dreams Often End</SectionHeading>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                  <p className="mb-4 text-sm text-slate-400">
                    These are common experiences, not guaranteed causes — everyone's dreams
                    behave a little differently.
                  </p>
                  <ul className="space-y-3">
                    {whyDreamsEndReasons.map((reason, index) => (
                      <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                          •
                        </span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Stabilization Techniques</SectionHeading>
                <div className="space-y-4">
                  {stabilizationTechniques.map((technique, index) => (
                    <StabilizationTechniqueCard
                      key={technique.id}
                      technique={technique}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Guided Walkthrough</SectionHeading>
                <div className="space-y-5">
                  <div className="rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 text-center backdrop-blur-md sm:p-8">
                    <p className="text-sm leading-6 text-slate-300">
                      Walk through these approaches one calm step at a time, so they feel familiar
                      before you actually need them.
                    </p>
                    <div className="mt-5">
                      <PillLink href="/mastery/stabilization/practice" variant="primary">
                        Start Guided Walkthrough
                      </PillLink>
                    </div>
                  </div>

                  <PracticeCalendar practicedDates={practicedDates} />

                  <LastPracticeSummary
                    lastEntry={lastEntry}
                    emptyMessage="No stabilization sessions yet. Your first one will appear here."
                    extraFields={
                      lastEntry?.approachesTried && lastEntry.approachesTried.length > 0
                        ? [
                            {
                              label: "Approaches Tried",
                              value: lastEntry.approachesTried
                                .map(
                                  (id) =>
                                    stabilizationTechniques.find((t) => t.id === id)?.title ?? id
                                )
                                .join(", "),
                            },
                          ]
                        : []
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}