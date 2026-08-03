"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SleepNav from "@/components/sleep/SleepNav";
import DreamIntentionCard from "@/components/sleep/DreamIntentionCard";
import { useDreamIntention } from "@/hooks/useDreamIntention";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { dreamIncubationExplanation } from "@/lib/sleep";

export default function IncubationPage() {
  const {
    intention,
    hasLoaded,
    setIntention,
    isSetToday,
  } = useDreamIntention();

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Dream Incubation"
            description="Choose a focus for tonight's dream before you fall asleep."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12 space-y-6">
              <div className="space-y-3 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                <p className="text-sm leading-6 text-slate-300">
                  {dreamIncubationExplanation.whatItIs}
                </p>

                <p className="text-sm leading-6 text-slate-300">
                  {dreamIncubationExplanation.whyItWorks}
                </p>

                <p className="text-sm leading-6 text-slate-300">
                  {dreamIncubationExplanation.howTo}
                </p>
              </div>

              <DreamIntentionCard
                currentText={intention?.text ?? ""}
                isSetToday={isSetToday}
                onSave={(text) =>
                  requireAuth(() => setIntention(text))
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}