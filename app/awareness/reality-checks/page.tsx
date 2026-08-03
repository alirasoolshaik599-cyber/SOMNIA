"use client";

import { useMemo, useState } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import AwarenessNav from "@/components/awareness/AwarenessNav";
import RealityCheckForm from "@/components/awareness/RealityCheckForm";
import RealityCheckCard from "@/components/awareness/RealityCheckCard";
import TodayCompletedList from "@/components/awareness/TodayCompletedList";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { todayKey } from "@/lib/awareness";

export default function RealityChecksPage() {
  const {
    realityChecks,
    hasLoaded,
    addRealityCheck,
    updateRealityCheck,
    deleteRealityCheck,
    toggleEnabled,
    toggleDoneToday,
  } = useRealityChecks();

  const { requireAuth } = useAuthContext();

  const [showAddForm, setShowAddForm] = useState(false);

  const today = todayKey();

  const sorted = useMemo(
    () =>
      [...realityChecks].sort((a, b) => {
        if (a.enabled === b.enabled) return 0;
        return a.enabled ? -1 : 1;
      }),
    [realityChecks]
  );

  const completedToday = useMemo(
    () => realityChecks.filter((rc) => rc.doneDates.includes(today)),
    [realityChecks, today]
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/awareness">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Reality Checks"
            description="A few sincere questions, asked often, build real awareness. Enable the techniques that fit your day."
          />

          <AwarenessNav />

          <div className="mt-12">
            <SectionHeading>Today</SectionHeading>
            <TodayCompletedList completedToday={completedToday} />
          </div>

          <div className="mt-10">
            {showAddForm ? (
              <RealityCheckForm
                submitLabel="Add Reality Check"
                onCancel={() => setShowAddForm(false)}
                onSubmit={(input) => {
                  requireAuth(() => {
                    addRealityCheck(input);
                    setShowAddForm(false);
                  });
                }}
              />
            ) : (
              <div className="flex justify-center">
                <Button onClick={() => setShowAddForm(true)}>
                  + Add Custom Reality Check
                </Button>
              </div>
            )}
          </div>

          {!hasLoaded ? (
            <LoadingState />
          ) : sorted.length === 0 ? (
            <div className="mt-16">
              <EmptyState
                icon="🔎"
                message="No reality checks yet. Add your first one above."
              />
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              <SectionHeading>Techniques</SectionHeading>

              {sorted.map((rc) => (
                <RealityCheckCard
                  key={rc.id}
                  realityCheck={rc}
                  doneToday={rc.doneDates.includes(today)}
                  onToggleDoneToday={(id) =>
                    requireAuth(() => toggleDoneToday(id))
                  }
                  onToggleEnabled={(id) =>
                    requireAuth(() => toggleEnabled(id))
                  }
                  onUpdate={(id, input) =>
                    requireAuth(() => updateRealityCheck(id, input))
                  }
                  onDelete={(id) =>
                    requireAuth(() => deleteRealityCheck(id))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}