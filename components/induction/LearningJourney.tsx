type JourneyStep = {
  label: string;
  status: "complete" | "current" | "future";
};

const steps: JourneyStep[] = [
  { label: "Dream Recall", status: "complete" },
  { label: "Awareness", status: "complete" },
  { label: "Sleep Preparation", status: "complete" },
  { label: "Lucid Dream Induction", status: "current" },
  { label: "Lucid Dream Mastery", status: "future" },
];

export default function LearningJourney() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
      <ol className="space-y-1">
        {steps.map((step, index) => (
          <li key={step.label}>
            <div
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                step.status === "current" ? "border border-[#5B6EFF]/30 bg-[#5B6EFF]/10" : ""
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  step.status === "complete"
                    ? "bg-[#5B6EFF] text-white"
                    : step.status === "current"
                    ? "border border-[#5B6EFF] text-[#a9b3ff]"
                    : "border border-white/15 text-slate-500"
                }`}
                aria-hidden="true"
              >
                {step.status === "complete" ? "✓" : index + 1}
              </span>
              <span
                className={`text-sm font-medium ${
                  step.status === "future"
                    ? "text-slate-500"
                    : step.status === "current"
                    ? "text-white"
                    : "text-slate-300"
                }`}
              >
                {step.label}
                {step.status === "current" && (
                  <span className="ml-2 text-xs font-normal text-[#a9b3ff]">— you are here</span>
                )}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-[1.9rem] h-4 w-px bg-white/10" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}