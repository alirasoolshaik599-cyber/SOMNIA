type StatBoxProps = {
  label: string;
  value: string | number;
};

export default function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center backdrop-blur-md sm:px-5">
      <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400 sm:text-xs">
        {label}
      </p>
    </div>
  );
}