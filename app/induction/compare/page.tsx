"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import SectionHeading from "@/components/ui/SectionHeading";
import InductionNav from "@/components/induction/InductionNav";
import TechniqueComparisonTable from "@/components/induction/TechniqueComparisonTable";
import TechniqueRecommendationGuide from "@/components/induction/TechniqueRecommendationGuide";
import { inductionTechniques } from "@/lib/inductionContent";

export default function CompareTechniquesPage() {
  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Compare Techniques"
            description="Every technique side by side, so you can choose what fits your life right now."
          />

          <InductionNav />

          <div className="mt-12">
            <SectionHeading>All Techniques</SectionHeading>
            <TechniqueComparisonTable techniques={inductionTechniques} />
          </div>

          <div className="mt-14">
            <SectionHeading>Choosing the Right Technique</SectionHeading>
            <p className="mb-6 text-sm text-slate-400">
              There&apos;s no wrong choice here — these are starting points, not rules.
            </p>
            <TechniqueRecommendationGuide />
          </div>
        </div>
      </div>
    </main>
  );
}