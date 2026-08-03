"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import GuidedInductionSession from "@/components/induction/GuidedInductionSession";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { wildSteps } from "@/lib/wildContent";

const WILD_GUIDED_SESSIONS_KEY = "somnia_wild_guided_sessions";

export default function GuidedWildPracticePage() {
  const { hasLoaded, saveTodayEntry } = useGuidedSessionLog(
    WILD_GUIDED_SESSIONS_KEY,
    "wild-session"
  );

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction/wild">← WILD</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Guided WILD Session"
            description="There's no rush here — move to the next step only when you're ready."
          />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
              <GuidedInductionSession
                steps={wildSteps}
                backHref="/induction/wild"
                backLabel="Back to WILD"
                reflectionPrompt="How prepared do you feel for tonight?"
                completionMessage="You've completed tonight's WILD practice. Rest well."
                onComplete={({ readiness, notes }) =>
                  requireAuth(() => {
                    saveTodayEntry({
                      readiness,
                      notes,
                    });
                  })
                }
                calm
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}