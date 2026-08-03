"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SleepNav from "@/components/sleep/SleepNav";
import PreSleepChecklistCard from "@/components/sleep/PreSleepChecklistCard";
import { usePreSleepChecklist } from "@/hooks/usePreSleepChecklist";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { useDreamIntention } from "@/hooks/useDreamIntention";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { todayKey } from "@/lib/awareness";
import { buildPreSleepChecklistItems } from "@/lib/sleep";

export default function ChecklistPage() {
  const {
    completedItemIds,
    hasLoaded: checklistLoaded,
    toggleItem,
  } = usePreSleepChecklist();

  const {
    realityChecks,
    hasLoaded: rcLoaded,
  } = useRealityChecks();

  const {
    isSetToday,
    hasLoaded: intentionLoaded,
  } = useDreamIntention();

  const { requireAuth } = useAuthContext();

  const hasLoaded =
    checklistLoaded &&
    rcLoaded &&
    intentionLoaded;

  const today = todayKey();

  const realityChecksDoneToday = realityChecks.some((rc) =>
    rc.doneDates.includes(today)
  );

  const items = buildPreSleepChecklistItems(
    completedItemIds,
    realityChecksDoneToday,
    isSetToday
  );

  const completedCount = items.filter((i) => i.checked).length;

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Pre-Sleep Checklist"
            description="A final, calm check before you close your eyes."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12 rounded-2xl border border-white/10 bg-black/25 px-6 py-4 text-center backdrop-blur-md">
                <p className="text-sm text-slate-400">
                  {completedCount} of {items.length} ready
                </p>
              </div>

              <div className="mt-8">
                <PreSleepChecklistCard
                  items={items}
                  onToggle={(id) =>
                    requireAuth(() => toggleItem(id))
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}