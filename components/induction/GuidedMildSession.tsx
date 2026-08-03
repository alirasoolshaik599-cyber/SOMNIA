"use client";

import Link from "next/link";
import GuidedInductionSession from "@/components/induction/GuidedInductionSession";
import { guidedSessionSteps } from "@/lib/mildContent";
import type { ReadinessLevel } from "@/types/induction";

type GuidedMildSessionProps = {
  phraseText: string | null;
  onComplete: (input: { readiness: ReadinessLevel; notes: string }) => void;
};

export default function GuidedMildSession({ phraseText, onComplete }: GuidedMildSessionProps) {
  return (
    <GuidedInductionSession
      steps={guidedSessionSteps}
      backHref="/induction/mild"
      backLabel="Back to MILD"
      onComplete={({ readiness, notes }) => onComplete({ readiness: readiness ?? "Ready", notes })}
      renderStepExtra={(stepId) => {
        if (stepId === "recall") {
          return (
            <Link
              href="/journal"
              className="mt-4 inline-block text-sm font-medium text-[#a9b3ff] underline-offset-4 hover:underline"
            >
              Open your Dream Journal
            </Link>
          );
        }
        if (stepId === "phrase") {
          return (
            <div className="mt-5 rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 text-center">
              {phraseText ? (
                <p className="text-lg font-bold text-white">&ldquo;{phraseText}&rdquo;</p>
              ) : (
                <>
                  <p className="text-sm text-slate-300">
                    You haven&apos;t saved a MILD phrase yet.
                  </p>
                  <Link
                    href="/induction/mild"
                    className="mt-3 inline-block text-sm font-medium text-[#a9b3ff] underline-offset-4 hover:underline"
                  >
                    Choose a phrase first
                  </Link>
                </>
              )}
            </div>
          );
        }
        return null;
      }}
    />
  );
}