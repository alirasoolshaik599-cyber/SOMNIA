"use client";

import { memo, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import RealityCheckForm from "./RealityCheckForm";
import { computeStreak } from "@/lib/awareness";
import type { RealityCheck } from "@/types/awareness";

type RealityCheckCardProps = {
  realityCheck: RealityCheck;
  doneToday: boolean;
  onToggleDoneToday: (id: string) => void;
  onToggleEnabled: (id: string) => void;
  onUpdate: (id: string, input: { label: string; description: string }) => void;
  onDelete: (id: string) => void;
};

function RealityCheckCard({
  realityCheck,
  doneToday,
  onToggleDoneToday,
  onToggleEnabled,
  onUpdate,
  onDelete,
}: RealityCheckCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const streak = useMemo(() => computeStreak(realityCheck.doneDates), [realityCheck.doneDates]);
  const hasDetails = Boolean(realityCheck.whyItWorks || realityCheck.howTo);
  const detailsId = `reality-check-details-${realityCheck.id}`;

  if (isEditing) {
    return (
      <RealityCheckForm
        initialLabel={realityCheck.label}
        initialDescription={realityCheck.description}
        submitLabel="Save Changes"
        onCancel={() => setIsEditing(false)}
        onSubmit={(input) => {
          onUpdate(realityCheck.id, input);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <>
      <div
        className={`rounded-3xl border p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.01] sm:p-6 ${
          realityCheck.enabled
            ? "border-white/10 bg-black/35 hover:border-[#5B6EFF]/20"
            : "border-white/5 bg-black/20 opacity-60"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">{realityCheck.label}</h3>
            {realityCheck.description && (
              <p className="mt-1 text-sm text-slate-400">{realityCheck.description}</p>
            )}
            {realityCheck.enabled && streak > 0 && (
              <p className="mt-2 text-sm font-medium text-[#a9b3ff]">
                {streak} day{streak === 1 ? "" : "s"} in a row
              </p>
            )}
          </div>

          <Toggle
            checked={realityCheck.enabled}
            onChange={() => onToggleEnabled(realityCheck.id)}
            label={`${realityCheck.enabled ? "Disable" : "Enable"} ${realityCheck.label}`}
          />
        </div>

        {hasDetails && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 rounded text-sm font-medium text-[#a9b3ff] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
            aria-expanded={expanded}
            aria-controls={detailsId}
          >
            {expanded ? "Hide details" : "Why it works & how to perform it"}
          </button>
        )}

        {expanded && hasDetails && (
          <div
            id={detailsId}
            className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {realityCheck.whyItWorks && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Why it works
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{realityCheck.whyItWorks}</p>
              </div>
            )}
            {realityCheck.howTo && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  How to perform it
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{realityCheck.howTo}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant={doneToday ? "outline" : "primary"}
            size="sm"
            disabled={!realityCheck.enabled}
            onClick={() => onToggleDoneToday(realityCheck.id)}
          >
            {doneToday ? "✓ Practiced Today" : "Mark as Practiced"}
          </Button>

          {realityCheck.isCustom && (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-slate-300 transition-all duration-300 active:scale-95 hover:border-[#5B6EFF]/40 hover:bg-[#5B6EFF]/20 hover:text-[#a9b3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-slate-300 transition-all duration-300 active:scale-95 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this reality check?"
        description={`"${realityCheck.label}" and its history will be permanently removed.`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(realityCheck.id);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default memo(RealityCheckCard);