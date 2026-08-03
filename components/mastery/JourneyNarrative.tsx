type JourneyNarrativeProps = {
  narrative: string[];
};

export default function JourneyNarrative({ narrative }: JourneyNarrativeProps) {
  if (narrative.length === 0) {
    return (
      <div className="rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-6 text-center backdrop-blur-md sm:p-8">
        <p className="text-sm leading-6 text-slate-300">
          Your journey is just getting started. Everything you do in SOMNIA from here will begin
          shaping this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-6 backdrop-blur-md sm:p-8">
      {narrative.map((line, index) => (
        <p key={index} className="text-base leading-7 text-white">
          {line}
        </p>
      ))}
    </div>
  );
}