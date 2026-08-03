"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import RatingPills from "@/components/ui/RatingPills";
import CheckToggle from "@/components/ui/CheckToggle";
import InductionNav from "@/components/induction/InductionNav";
import PracticeEntryRow from "@/components/induction/PracticeEntryRow";
import PracticeCalendar from "@/components/induction/PracticeCalendar";
import LastPracticeSummary from "@/components/induction/LastPracticeSummary";
import { usePracticeLog } from "@/hooks/usePracticeLog";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { useAuthContext } from "@/components/providers/AuthProvider";
import {
  wildOverview,
  wildPreparationTopics,
  wildTips,
  wildCommonMistakes,
} from "@/lib/wildContent";
import type { PracticeConfidence } from "@/types/induction";

const CONFIDENCE_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const WILD_PRACTICE_LOG_KEY = "somnia_wild_practice_log";
const WILD_GUIDED_SESSIONS_KEY = "somnia_wild_guided_sessions";

export default function WildTrainingPage() {
  const {
    entries,
    hasLoaded: logLoaded,
    saveTodayEntry,
    deleteEntry,
    getTodayEntry,
  } = usePracticeLog(WILD_PRACTICE_LOG_KEY, "wild-practice");
  const {
    hasLoaded: sessionsLoaded,
    practicedDates,
    lastEntry: lastGuidedEntry,
  } = useGuidedSessionLog(WILD_GUIDED_SESSIONS_KEY, "wild-session");
  const { requireAuth } = useAuthContext();
  const hasLoaded = logLoaded && sessionsLoaded;

  const [practiced, setPracticed] = useState(false);
  const [confidence, setConfidence] = useState<PracticeConfidence>("Medium");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasLoaded) return;
    const existing = getTodayEntry();
    if (existing) {
      setPracticed(existing.practiced);
      setConfidence(existing.confidence);
      setNotes(existing.notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoaded]);

  const handleSave = () => {
    requireAuth(() => {
      saveTodayEntry({
        practiced,
        confidence,
        notes,
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    });
  };
  const todayEntryId = getTodayEntry()?.id;
  const pastEntries = useMemo(
    () => entries.filter((e) => e.id !== todayEntryId),
    [entries, todayEntryId]
  );

  const handleRequestDelete = useCallback(
    (id: string) => {
      requireAuth(() => {
        setDeleteTargetId(id);
      });
    },
    [requireAuth]
  );
  const handleConfidenceSelect = useCallback(
    (v: string) => setConfidence(v as PracticeConfidence),
    []
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/induction">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Wake Initiated Lucid Dream"
            description="A slower, more meditative technique — built around calm, sustained awareness."
          />

          <InductionNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12 space-y-3 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    What it is
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{wildOverview.whatItIs}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Why it works
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {wildOverview.whyItWorks}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    When to practice
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {wildOverview.whenToPractice}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Best suited for
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{wildOverview.bestFor}</p>
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Preparation</SectionHeading>
                <div className="space-y-3 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                  {wildPreparationTopics.map((topic) => (
                    <div key={topic.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {topic.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{topic.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Guided Session</SectionHeading>
                <div className="space-y-5">
                  <div className="rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 text-center backdrop-blur-md sm:p-8">
                    <p className="text-sm leading-6 text-slate-300">
                      Ready to practice? This session moves slowly — take all the time you need on
                      each step.
                    </p>
                    <div className="mt-5">
                      <PillLink href="/induction/wild/practice" variant="primary">
                        Start Guided WILD Session
                      </PillLink>
                    </div>
                  </div>

                  <PracticeCalendar practicedDates={practicedDates} />

                  <LastPracticeSummary
                    lastEntry={lastGuidedEntry}
                    emptyMessage="No guided WILD sessions yet. Your first one will appear here."
                  />
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Tonight&apos;s Practice</SectionHeading>

                <div className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
                  <div className="flex items-center gap-4">
                    <CheckToggle
                      checked={practiced}
                      onToggle={() => setPracticed((v) => !v)}
                      label={`Mark as ${practiced ? "not practiced" : "practiced"} tonight`}
                    />
                    <p className="text-base font-medium text-white">Practiced tonight</p>
                  </div>

                  <div>
                    <p className="mb-3 text-base font-medium text-white sm:text-lg">
                      Confidence before sleep
                    </p>
                    <RatingPills
                      options={CONFIDENCE_OPTIONS}
                      selectedValue={confidence}
                      onSelect={handleConfidenceSelect}
                      ariaLabel="Confidence before sleep"
                    />
                  </div>

                  <TextArea
                    label="Notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did tonight's practice feel?"
                    className="!h-32 sm:!h-40"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button onClick={handleSave}>Save Tonight&apos;s Practice</Button>
                    <span role="status" aria-live="polite" className="text-sm text-[#a9b3ff]">
                      {saved ? "Saved ✓" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Past Practice</SectionHeading>

                {pastEntries.length === 0 ? (
                  <EmptyState icon="🌙" message="Your past practice sessions will appear here." />
                ) : (
                  <div className="space-y-4">
                    {pastEntries.map((entry) => (
                      <PracticeEntryRow
                        key={entry.id}
                        entry={entry}
                        onDelete={handleRequestDelete}
                        entryLabel="WILD practice"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                  <h2 className="text-lg font-bold text-white">Common Mistakes</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Completely normal — here&apos;s what to watch for.
                  </p>
                  <ul className="mt-4 space-y-3">
                    {wildCommonMistakes.map((mistake, index) => (
                      <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                          •
                        </span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-6">
                  <h2 className="text-lg font-bold text-white">Tips for Success</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Small habits that make the biggest difference.
                  </p>
                  <ul className="mt-4 space-y-3">
                    {wildTips.map((tip, index) => (
                      <li key={index} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <span className="shrink-0 text-[#a9b3ff]" aria-hidden="true">
                          •
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete this entry?"
        description="This past practice session will be permanently removed."
        confirmLabel="Delete"
        onConfirm={() => {
          requireAuth(() => {
            if (deleteTargetId) {
              deleteEntry(deleteTargetId);
            }

            setDeleteTargetId(null);
          });
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </main>
  );
}