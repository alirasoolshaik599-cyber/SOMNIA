import type { InductionTechnique } from "@/lib/inductionContent";

type TechniqueComparisonTableProps = {
  techniques: InductionTechnique[];
};

function BoolCell({ value }: { value: boolean }) {
  return (
    <span className={value ? "text-[#a9b3ff]" : "text-slate-500"} aria-label={value ? "Yes" : "No"}>
      {value ? "Yes" : "No"}
    </span>
  );
}

export default function TechniqueComparisonTable({ techniques }: TechniqueComparisonTableProps) {
  const rows: {
    label: string;
    render: (t: InductionTechnique) => React.ReactNode;
  }[] = [
    { label: "Difficulty", render: (t) => t.difficulty },
    { label: "Beginner Friendly", render: (t) => <BoolCell value={t.beginnerFriendly} /> },
    {
      label: "Requires Waking at Night",
      render: (t) => <BoolCell value={t.requiresWakingAtNight} />,
    },
    {
      label: "Visualization Required",
      render: (t) => <BoolCell value={t.visualizationRequired} />,
    },
    { label: "Best Time to Practice", render: (t) => t.bestTimeToPractice },
    { label: "Patience Required", render: (t) => t.patienceRequired },
    {
      label: "Training",
      render: (t) => (t.trainingStatus === "guided" ? "Guided" : "Overview"),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-slate-400">
              Attribute
            </th>
            {techniques.map((t) => (
              <th
                key={t.id}
                scope="col"
                className="px-5 py-4 text-sm font-bold text-white"
              >
                {t.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={index % 2 === 0 ? "bg-black/10" : ""}
            >
              <th
                scope="row"
                className="px-5 py-3.5 text-sm font-medium text-slate-300"
              >
                {row.label}
              </th>
              {techniques.map((t) => (
                <td key={t.id} className="px-5 py-3.5 text-sm text-slate-300">
                  {row.render(t)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}