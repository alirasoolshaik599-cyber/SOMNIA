"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import GuidedMildSession from "@/components/induction/GuidedMildSession";
import { useMildPhrase } from "@/hooks/useMildPhrase";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { useAuthContext } from "@/components/providers/AuthProvider";

const MILD_GUIDED_SESSIONS_KEY = "somnia_mild_guided_sessions";

export default function GuidedMildPracticePage() {
  const { phrase, hasLoaded: phraseLoaded } = useMildPhrase();
  const { hasLoaded: sessionsLoaded, saveTodayEntry } = useGuidedSessionLog(
    MILD_GUIDED_SESSIONS_KEY,
    "mild-session"
  );
  
  const { requireAuth } = useAuthContext();
  const hasLoaded = phraseLoaded && sessionsLoaded;

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction/mild">← MILD</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Guided MILD Session"
            description="A calm, step-by-step walk through tonight's practice."
          />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
             <GuidedMildSession
               phraseText={phrase?.text ?? null}
               onComplete={({ readiness, notes }) =>
                 requireAuth(() => {
                   saveTodayEntry({
                     readiness,
                     notes,
                   });
                 })
               }
             />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}