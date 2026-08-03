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
import SleepNav from "@/components/sleep/SleepNav";
import ReflectionEntryRow from "@/components/sleep/ReflectionEntryRow";
import { useEveningReflection } from "@/hooks/useEveningReflection";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { reflectionPrompts } from "@/lib/sleep";

export default function ReflectionPage() {
  const {
    entries,
    hasLoaded,
    saveTodayEntry,
    deleteEntry,
    getTodayEntry,
  } = useEveningReflection();

  const { requireAuth } = useAuthContext();

  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasLoaded) return;

    const existing = getTodayEntry();

    if (existing) {
      setText(existing.text);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoaded]);

  const handleSave = () => {
    requireAuth(() => {
      saveTodayEntry(text);

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

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Evening Reflection"
            description="A quiet moment to notice the day before you sleep."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
                <div>
                  <p className="mb-3 text-base font-medium text-white sm:text-lg">
                    A few questions to consider
                  </p>

                  <ul className="space-y-1.5">
                    {reflectionPrompts.map((prompt) => (
                      <li key={prompt} className="text-sm text-slate-400">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>

                <TextArea
                  label="Tonight's reflection"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write freely — there's no right way to do this."
                />

                <div className="flex flex-wrap items-center gap-4">
                  <Button onClick={handleSave}>
                    Save Reflection
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
                <SectionHeading>Past Reflections</SectionHeading>

                {pastEntries.length === 0 ? (
                  <EmptyState
                    icon="🪞"
                    message="Your past reflections will appear here."
                  />
                ) : (
                  <div className="space-y-4">
                    {pastEntries.map((entry) => (
                      <ReflectionEntryRow
                        key={entry.id}
                        entry={entry}
                        onDelete={handleRequestDelete}
                      />
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
        title="Delete this reflection?"
        description="This past entry will be permanently removed."
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