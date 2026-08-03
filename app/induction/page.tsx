"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import SectionHeading from "@/components/ui/SectionHeading";
import InductionNav from "@/components/induction/InductionNav";
import LearningJourney from "@/components/induction/LearningJourney";
import {
  inductionIntro,
  inductionTechniques,
  beginnerRecommendation,
} from "@/lib/inductionContent";

export default function InductionHubPage() {
  const recommended = inductionTechniques.find(
    (t) => t.id === beginnerRecommendation.techniqueId
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Lucid Dream Induction"
            description="You've built the foundation. Now it's time to understand how induction actually works."
          />

          <InductionNav />

          <div className="mt-12 space-y-5">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
              <h2 className="text-lg font-bold text-white">What is induction?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{inductionIntro.whatIsIt}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
              <h2 className="text-lg font-bold text-white">Why preparation matters</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {inductionIntro.whyPreparationMatters}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
              <h2 className="text-lg font-bold text-white">
                Why Recall, Awareness & Sleep came first
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{inductionIntro.whyThisOrder}</p>
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading>Your Journey</SectionHeading>
            <LearningJourney />
          </div>

          {recommended && (
            <div className="mt-14">
              <SectionHeading>Start Here</SectionHeading>
              <div className="rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 backdrop-blur-md sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Recommended First Technique
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">{recommended.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{recommended.fullName}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {beginnerRecommendation.reason}
                </p>
                <div className="mt-6">
                  <PillLink href="/induction/mild" variant="primary">
                    Start Guided MILD Training
                  </PillLink>
                </div>
              </div>
            </div>
          )}

          <div className="mt-14">
            <SectionHeading>All Techniques</SectionHeading>
            <p className="mb-6 text-sm text-slate-400">
              A quick overview of every technique SOMNIA will teach. Full guided training comes
              later.
            </p>
            <PillLink href="/induction/techniques" variant="primary">
              Explore the Technique Library
            </PillLink>
          </div>
        </div>
      </div>
    </main>
  );
}