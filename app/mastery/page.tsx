"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import HubCard from "@/components/ui/HubCard";
import MasteryNav from "@/components/mastery/MasteryNav";
import { masteryIntro } from "@/lib/masteryContent";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";

const STABILIZATION_SESSIONS_KEY = "somnia_stabilization_sessions";

export default function MasteryHubPage() {
  const { hasLoaded, entries } = useGuidedSessionLog(
    STABILIZATION_SESSIONS_KEY,
    "stabilization-session"
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Lucid Dream Mastery"
            description="Induction is only the beginning. This is where you learn what to do once you're there."
          />

          <MasteryNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                <h2 className="text-lg font-bold text-white">What is Mastery?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{masteryIntro.whatItIs}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                <h2 className="text-lg font-bold text-white">Why It Matters</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {masteryIntro.whyItMatters}
                </p>
              </div>

              <HubCard
                href="/mastery/stabilization"
                icon="🧭"
                title="Stabilization"
                description="Learn why lucid dreams often fade, and what to try to help them last."
                stat={
                  entries.length === 0
                    ? "Not started yet"
                    : `${entries.length} session${entries.length === 1 ? "" : "s"} logged`
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}