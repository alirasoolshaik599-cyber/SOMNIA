import PillLink from "@/components/ui/PillLink";
import { inductionTechniques } from "@/lib/inductionContent";

type Scenario = {
  situation: string;
  techniqueId: string;
};

const scenarios: Scenario[] = [
  { situation: "New to lucid dreaming", techniqueId: "mild" },
  { situation: "Comfortable waking during the night", techniqueId: "wbtb" },
  { situation: "Prefer meditation-like techniques", techniqueId: "wild" },
  { situation: "Find visualization difficult", techniqueId: "ssild" },
  { situation: "Want a quick technique right after waking", techniqueId: "fild" },
];

export default function TechniqueRecommendationGuide() {
  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => {
        const technique = inductionTechniques.find((t) => t.id === scenario.techniqueId);
        if (!technique) return null;

        return (
          <div
            key={scenario.situation}
            className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  If you&apos;re...
                </p>
                <p className="mt-1 text-base font-medium text-white">{scenario.situation}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {technique.chooseIfDescription}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 px-4 py-3 text-center">
                <p className="text-xs text-slate-400">Consider</p>
                <p className="text-lg font-bold text-white">{technique.name}</p>
              </div>
            </div>

            {technique.learnMoreHref && (
              <div className="mt-4">
                <PillLink href={technique.learnMoreHref} variant="primary" className="text-sm">
                  {technique.learnMoreLabel ?? "Learn More"}
                </PillLink>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}