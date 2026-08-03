type ActivityBreakdownProps = {
  last7Days: number;
  last30Days: number;
};

export default function ActivityBreakdown({ last7Days, last30Days }: ActivityBreakdownProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-[#5B6EFF]/20">
        <p className="text-3xl font-bold text-white">{last7Days}</p>
        <p className="mt-2 text-sm text-slate-400">Practices in the last 7 days</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-[#5B6EFF]/20">
        <p className="text-3xl font-bold text-white">{last30Days}</p>
        <p className="mt-2 text-sm text-slate-400">Practices in the last 30 days</p>
      </div>
    </div>
  );
}