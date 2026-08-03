"use client";

import { useState } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SleepNav from "@/components/sleep/SleepNav";
import AddRoutineItemForm from "@/components/sleep/AddRoutineItemForm";
import RoutineItemRow from "@/components/sleep/RoutineItemRow";
import { useRoutine } from "@/hooks/useRoutine";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { todayKey } from "@/lib/awareness";

export default function RoutinePage() {
  const {
    items,
    hasLoaded,
    addItem,
    deleteItem,
    toggleDoneToday,
    moveItem,
  } = useRoutine();

  const { requireAuth } = useAuthContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const today = todayKey();

  const completedCount = items.filter((i) =>
    i.doneDates.includes(today)
  ).length;

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Bedtime Routine"
            description="A steady wind-down routine signals to your mind that sleep — and dreaming — is coming."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12 rounded-2xl border border-white/10 bg-black/25 px-6 py-4 text-center backdrop-blur-md">
                <p className="text-sm text-slate-400">
                  {completedCount} of {items.length} completed tonight
                </p>
              </div>

              <div className="mt-8">
                {showAddForm ? (
                  <AddRoutineItemForm
                    onSubmit={(label) => {
                      requireAuth(() => {
                        addItem({ label });
                        setShowAddForm(false);
                      });
                    }}
                    onCancel={() => setShowAddForm(false)}
                  />
                ) : (
                  <div className="flex justify-center">
                    <Button onClick={() => setShowAddForm(true)}>
                      + Add Routine Item
                    </Button>
                  </div>
                )}
              </div>

              {items.length === 0 ? (
                <div className="mt-10">
                  <EmptyState
                    icon="🌙"
                    message="No routine items yet. Add your first one above."
                  />
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  {items.map((item, index) => (
                    <RoutineItemRow
                      key={item.id}
                      item={item}
                      doneToday={item.doneDates.includes(today)}
                      isFirst={index === 0}
                      isLast={index === items.length - 1}
                      onToggleDoneToday={(id) =>
                        requireAuth(() => toggleDoneToday(id))
                      }
                      onMoveUp={(id) =>
                        requireAuth(() => moveItem(id, "up"))
                      }
                      onMoveDown={(id) =>
                        requireAuth(() => moveItem(id, "down"))
                      }
                      onDelete={(id) =>
                        requireAuth(() => setDeleteTargetId(id))
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTargetId !== null}
        title="Delete this routine item?"
        description="This item and its history will be permanently removed."
        confirmLabel="Delete"
        onConfirm={() => {
          requireAuth(() => {
            if (deleteTargetId) {
              deleteItem(deleteTargetId);
            }
            setDeleteTargetId(null);
          });
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </main>
  );
}