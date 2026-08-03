"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import GuidedInductionSession from "@/components/induction/GuidedInductionSession";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { useAuthContext } from "@/components/providers/AuthProvider";
import {
  stabilizationSteps,
  stabilizationApproachOptions,
} from "@/lib/stabilizationContent";

const STABILIZATION_SESSIONS_KEY = "somnia_stabilization_sessions";

export default function GuidedStabilizationPracticePage() {
  const { hasLoaded, saveTodayEntry } = useGuidedSessionLog(
    STABILIZATION_SESSIONS_KEY,
    "stabilization-session"
  );

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/mastery/stabilization">← Stabilization</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Guided Stabilization Walkthrough"
            description="A calm run-through of what you might try after becoming lucid."
          />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
              <GuidedInductionSession
                steps={stabilizationSteps}
                approachOptions={stabilizationApproachOptions}
                backHref="/mastery/stabilization"
                backLabel="Back to Stabilization"
                completionMessage="You've walked through the stabilization approaches. Keep them in mind for next time you're lucid."
                onComplete={({ approachesTried, notes }) =>
                  requireAuth(() => {
                    saveTodayEntry({
                      approachesTried,
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