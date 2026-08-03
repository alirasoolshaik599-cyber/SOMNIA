"use client";

import { useState, useEffect, useMemo } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import AwarenessNav from "@/components/awareness/AwarenessNav";
import AwarenessExerciseCard from "@/components/awareness/AwarenessExerciseCard";
import { useDailyAwareness } from "@/hooks/useDailyAwareness";
import { useAwarenessExercises } from "@/hooks/useAwarenessExercises";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { awarenessExercises } from "@/lib/awarenessContent";

const RATING_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];

export default function DailyAwarenessPage() {
  const {
    entries,
    hasLoaded: daLoaded,
    saveTodayEntry,
    deleteEntry,
    getTodayEntry,
  } = useDailyAwareness();

  const {
    hasLoaded: exLoaded,
    isDoneToday,
    markDoneToday,
  } = useAwarenessExercises();

  const { requireAuth } = useAuthContext();

  const hasLoaded = daLoaded && exLoaded;

  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasLoaded) return;

    const existing = getTodayEntry();

    if (existing) {
      setRating(existing.awarenessRating);
      setNote(existing.note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoaded]);

  const handleSave = () => {
    requireAuth(() => {
      saveTodayEntry({
        awarenessRating: rating,
        note,
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

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/awareness">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Daily Awareness"
            description="Short, intentional practices — plus a moment to check in on your day."
          />

          <AwarenessNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12">
                <SectionHeading>Awareness Exercises</SectionHeading>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {awarenessExercises.map((exercise) => (
                    <AwarenessExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      doneToday={isDoneToday(exercise.id)}
                      onComplete={(id) =>
                        requireAuth(() => markDoneToday(id))
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="mt-14 space-y-6 rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
                <div>
                  <p className="mb-3 text-base font-medium text-white sm:text-lg">
                    How aware did you feel today?
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {RATING_LABELS.map((label, index) => {
                      const value = index + 1;
                      const isSelected = rating === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          aria-pressed={isSelected}
                          className={`rounded-full border px-3.5 py-2.5 text-xs transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] sm:px-4 sm:text-sm ${
                            isSelected
                              ? "border-[#5B6EFF] bg-[#5B6EFF]/20 text-[#a9b3ff]"
                              : "border-white/10 bg-black/30 text-slate-300 hover:bg-black/50"
                          }`}
                        >
                          {value} · {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <TextArea
                  label="Notes (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What helped or hurt your awareness today?"
                  className="!h-32 sm:!h-40"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <Button onClick={handleSave}>
                    Save Today&apos;s Check-In
                  </Button>

                  <span
                    role="status"
                    aria-live="polite"
                    className="text-sm text-[#a9b3ff]"
                  >
                    {saved ? "Saved ✓" : ""}
                  </span>
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading>Past Entries</SectionHeading>

                {pastEntries.length === 0 ? (
                  <EmptyState
                    icon="🌤️"
                    message="Your past check-ins will appear here."
                  />
                ) : (
                  <div className="space-y-4">
                    {pastEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-md sm:px-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm text-slate-400">
                              {entry.date}
                            </p>

                            <p className="mt-1 font-medium text-white">
                              {entry.awarenessRating} ·{" "}
                              {RATING_LABELS[
                                entry.awarenessRating - 1
                              ]}
                            </p>

                            {entry.note && (
                              <p className="mt-2 text-sm text-slate-300">
                                {entry.note}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(entry.id)}
                            className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-300 transition-all duration-300 active:scale-95 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete this entry?"
        description="This past check-in will be permanently removed."
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