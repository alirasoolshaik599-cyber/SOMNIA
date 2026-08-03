"use client";

import Link from "next/link";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import GuidedInductionSession from "@/components/induction/GuidedInductionSession";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { wbtbSteps } from "@/lib/wbtbContent";

const WBTB_GUIDED_SESSIONS_KEY = "somnia_wbtb_guided_sessions";

export default function GuidedWbtbPracticePage() {
  const { hasLoaded, saveTodayEntry } = useGuidedSessionLog(
    WBTB_GUIDED_SESSIONS_KEY,
    "wbtb-session"
  );

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction/wbtb">← WBTB</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Guided WBTB Session"
            description="A calm, step-by-step walk through tonight's wake-and-return."
          />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
              <GuidedInductionSession
                steps={wbtbSteps}
                backHref="/induction/wbtb"
                backLabel="Back to WBTB"
                reflectionPrompt="How prepared do you feel for tonight?"
                completionMessage="You've completed tonight's WBTB walkthrough. Rest well."
                onComplete={({ readiness, notes }) =>
                  requireAuth(() => {
                    saveTodayEntry({
                      readiness,
                      notes,
                    });
                  })
                }
                renderStepExtra={(stepId) =>
                  stepId === "return-with-intention" ? (
                    <p className="mt-4 text-sm text-slate-400">
                      Tip: you can also repeat your{" "}
                      <Link
                        href="/induction/mild"
                        className="font-medium text-[#a9b3ff] underline-offset-4 hover:underline"
                      >
                        MILD phrase
                      </Link>{" "}
                      here, if you have one set.
                    </p>
                  ) : null
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}