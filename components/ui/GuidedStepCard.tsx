"use client";

import { useState, type ReactNode } from "react";

type GuidedStepCardProps = {
  idPrefix: string;
  title: string;
  description: string;
  numberBadge?: number;
  tag?: string;
  expandLabel?: string;
  collapseLabel?: string;
  hoverScale?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
};

export default function GuidedStepCard({
  idPrefix,
  title,
  description,
  numberBadge,
  tag,
  expandLabel = "Show details",
  collapseLabel = "Hide details",
  hoverScale = false,
  children,
  footer,
}: GuidedStepCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailId = `${idPrefix}-detail`;
  const indentClass = numberBadge !== undefined ? "sm:ml-[3.25rem]" : "";

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#5B6EFF]/20 sm:p-6 ${
        hoverScale ? "hover:scale-[1.01]" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {numberBadge !== undefined && (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5B6EFF]/40 bg-[#5B6EFF]/10 text-sm font-semibold text-[#a9b3ff]"
            aria-hidden="true"
          >
            {numberBadge}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        {tag && (
          <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-400">
            {tag}
          </span>
        )}
      </div>

      {children && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={detailId}
            className={`mt-3 flex min-h-[44px] items-center text-sm font-medium text-[#a9b3ff] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] ${indentClass}`}
          >
            {expanded ? collapseLabel : expandLabel}
          </button>

          {expanded && (
            <div
              id={detailId}
              className={`mt-2 rounded-2xl border border-white/10 bg-black/20 p-4 ${indentClass}`}
            >
              {children}
            </div>
          )}
        </>
      )}

      {footer && <div className="mt-5">{footer}</div>}
    </div>
  );
}