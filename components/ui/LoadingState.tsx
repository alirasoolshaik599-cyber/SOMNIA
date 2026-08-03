type LoadingStateProps = {
  label?: string;
};

export default function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-16 flex flex-col items-center gap-3 text-slate-400"
    >
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#5B6EFF]/60 motion-reduce:animate-none [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#5B6EFF]/60 motion-reduce:animate-none [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#5B6EFF]/60 motion-reduce:animate-none" />
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
}