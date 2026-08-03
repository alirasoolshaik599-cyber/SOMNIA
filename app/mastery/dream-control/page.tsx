"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import SectionHeading from "@/components/ui/SectionHeading";
import MasteryNav from "@/components/mastery/MasteryNav";
import DreamControlTopicCard from "@/components/mastery/DreamControlTopicCard";
import { dreamControlIntro, dreamControlTopics } from "@/lib/dreamControlContent";

export default function DreamControlPage() {
  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/mastery">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Dream Control"
            description="A calm reference for exploring what's possible once you're lucid — at your own pace, in any order."
          />

          <MasteryNav />

          <div className="mt-12 space-y-3 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What is Dream Control?
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {dreamControlIntro.whatItIs}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                How it develops
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {dreamControlIntro.howItDevelops}
              </p>
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading>Explore a Topic</SectionHeading>
            <p className="mb-6 text-sm text-slate-400">
              Open whichever topic interests you — there&apos;s no required order.
            </p>
            <div className="space-y-4">
              {dreamControlTopics.map((topic) => (
                <DreamControlTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}