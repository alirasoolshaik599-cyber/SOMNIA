import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: string;
  message: string;
  action?: ReactNode;
  compact?: boolean;
};

export default function EmptyState({ icon, message, action, compact = false }: EmptyStateProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-black/25 text-center backdrop-blur-md ${
        compact ? "px-6 py-8" : "px-6 py-14 sm:px-8 sm:py-16"
      }`}
    >
      <span className={compact ? "text-3xl" : "text-4xl"} aria-hidden="true">
        {icon}
      </span>
      <p className="mt-4 text-slate-400">{message}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}