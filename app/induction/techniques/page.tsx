"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import InductionNav from "@/components/induction/InductionNav";
import TechniqueCard from "@/components/induction/TechniqueCard";
import { inductionTechniques } from "@/lib/inductionContent";

export default function InductionTechniquesPage() {
  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Technique Library"
            description="An overview of the major induction techniques. Full guided training comes in a future stage."
          />

          <InductionNav />

          <div className="mt-12 space-y-5">
            {inductionTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}