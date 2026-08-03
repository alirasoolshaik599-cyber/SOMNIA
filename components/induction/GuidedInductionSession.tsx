"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import RatingPills from "@/components/ui/RatingPills";
import MultiSelectPills from "@/components/ui/MultiSelectPills";
import type { GuidedSessionStepContent, ReadinessLevel } from "@/types/induction";

const READINESS_OPTIONS = [
  { value: "Not Ready", label: "Not Ready" },
  { value: "Somewhat Ready", label: "Somewhat Ready" },
  { value: "Ready", label: "Ready" },
  { value: "Very Ready", label: "Very Ready" },
];

type ApproachOption = { id: string; label: string };

type GuidedInductionSessionProps = {
  steps: GuidedSessionStepContent[];
  renderStepExtra?: (stepId: string) => ReactNode;
  reflectionPrompt?: string;
  completionTitle?: string;
  completionMessage?: string;
  backHref: string;
  backLabel: string;
  onComplete: (input: {
    readiness?: ReadinessLevel;
    approachesTried?: string[];
    notes: string;
  }) => void;
  /** When true, renders the step view with more whitespace, centered text, a
   *  dot progress indicator instead of "Step X of Y", and a gentle fade
   *  between steps — used by slower, meditative techniques like WILD.
   *  Defaults to false, which renders identically to the original MILD/WBTB flow. */
  calm?: boolean;
  /** When provided, the reflection stage asks "which of these did you try"
   *  as a multi-select instead of a single readiness rating. Used by
   *  Stabilization; omitted entirely for MILD/WBTB/WILD. */
  approachOptions?: ApproachOption[];
};

type Stage = "steps" | "reflection" | "complete";

export default function GuidedInductionSession({
  steps,
  renderStepExtra,
  reflectionPrompt,
  completionTitle = "Session Complete",
  completionMessage = "You've set your intention for tonight. Rest well.",
  backHref,
  backLabel,
  onComplete,
  calm = false,
  approachOptions,
}: GuidedInductionSessionProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("steps");
  const [readiness, setReadiness] = useState<ReadinessLevel>("Ready");
  const [selectedApproaches, setSelectedApproaches] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const totalSteps = steps.length;
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const usingApproaches = Boolean(approachOptions);

  const resolvedReflectionPrompt =
    reflectionPrompt ??
    (usingApproaches
      ? "Which approaches did you try?"
      : "How prepared do you feel for tonight?");

  const goNext = () => {
    if (isLastStep) {
      setStage("reflection");
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const toggleApproach = (id: string) => {
    setSelectedApproaches((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    onComplete({
      readiness: usingApproaches ? undefined : readiness,
      approachesTried: usingApproaches ? selectedApproaches : undefined,
      notes,
    });
    setStage("complete");
  };

  if (stage === "complete") {
    return (
      <div className="rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-6 text-center backdrop-blur-md sm:p-10">
        <span className="text-4xl" aria-hidden="true">
          🌙
        </span>
        <h2 className="mt-4 text-xl font-bold text-white">{completionTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{completionMessage}</p>
        <div className="mt-6">
          <Link href={backHref}>
            <Button variant="ghost">{backLabel}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (stage === "reflection") {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
        <h2 className="text-lg font-bold text-white">{resolvedReflectionPrompt}</h2>

        <div className="mt-4">
          {usingApproaches && approachOptions ? (
            <MultiSelectPills
              options={approachOptions.map((a) => ({ value: a.id, label: a.label }))}
              selectedValues={selectedApproaches}
              onToggle={toggleApproach}
              ariaLabel={resolvedReflectionPrompt}
            />
          ) : (
            <RatingPills
              options={READINESS_OPTIONS}
              selectedValue={readiness}
              onSelect={(v) => setReadiness(v as ReadinessLevel)}
              ariaLabel={resolvedReflectionPrompt}
            />
          )}
        </div>

        <div className="mt-6">
          <TextArea
            label="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything worth remembering from tonight's session?"
            className="!h-32 sm:!h-40"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleFinish}>Finish Session</Button>
          <Button variant="ghost" onClick={() => setStage("steps")}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (calm) {
    return (
      <div
        key={currentStep.id}
        className="animate-[fadeIn_600ms_ease-out] rounded-3xl border border-white/10 bg-black/35 px-6 py-12 text-center backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] motion-reduce:animate-none sm:px-12 sm:py-16"
      >
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <div className="flex gap-2" aria-hidden="true">
            {steps.map((step, i) => (
              <span
                key={step.id}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  i === stepIndex ? "bg-[#5B6EFF]" : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            Step {stepIndex + 1} of {totalSteps}
          </span>

          <h2 className="mt-8 text-2xl font-bold text-white">{currentStep.title}</h2>
          <p className="mt-2 text-sm text-[#a9b3ff]">{currentStep.purpose}</p>
          <p className="mt-6 text-base leading-8 text-slate-300">{currentStep.guidance}</p>

          {renderStepExtra?.(currentStep.id)}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
              Back
            </Button>
            <Button onClick={goNext}>{isLastStep ? "Continue" : "Next"}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Step {stepIndex + 1} of {totalSteps}
      </p>

      <h2 className="mt-2 text-xl font-bold text-white">{currentStep.title}</h2>
      <p className="mt-1 text-sm text-[#a9b3ff]">{currentStep.purpose}</p>
      <p className="mt-4 text-sm leading-6 text-slate-300">{currentStep.guidance}</p>

      {renderStepExtra?.(currentStep.id)}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
          Back
        </Button>
        <Button onClick={goNext}>{isLastStep ? "Continue" : "Next"}</Button>
      </div>
    </div>
  );
}