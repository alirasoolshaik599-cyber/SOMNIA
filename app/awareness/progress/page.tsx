"use client";

import { useMemo } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import AwarenessNav from "@/components/awareness/AwarenessNav";
import AwarenessStats from "@/components/awareness/AwarenessStats";
import ActivityBreakdown from "@/components/awareness/ActivityBreakdown";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { useDailyAwareness } from "@/hooks/useDailyAwareness";
import { useAwarenessExercises } from "@/hooks/useAwarenessExercises";
import {
  computeStreak,
  countInLastNDays,
  countUniqueDaysInLastNDays,
  todayKey,
} from "@/lib/awareness";

export default function AwarenessProgressPage() {
  const { realityChecks, hasLoaded: rcLoaded } = useRealityChecks();
  const { entries, hasLoaded: daLoaded } = useDailyAwareness();
  const { completions, hasLoaded: exLoaded, totalCompletions } = useAwarenessExercises();

  const hasLoaded = rcLoaded && daLoaded && exLoaded;

  const stats = useMemo(() => {
    const realityCheckDates = realityChecks.flatMap((rc) => rc.doneDates);
    const exerciseDates = completions.flatMap((c) => c.doneDates);
    const dailyEntryDates = entries.map((e) => e.date);
    const allActivityDates = [...realityCheckDates, ...exerciseDates, ...dailyEntryDates];

    const today = todayKey();
    const realityChecksToday = realityCheckDates.filter((d) => d === today).length;
    const realityChecksThisWeek = countInLastNDays(realityCheckDates, 7);
    const currentStreak = computeStreak(allActivityDates);
    const hasAnyActivity = allActivityDates.length > 0;
    const consistencyPercent = hasAnyActivity
      ? Math.round((countUniqueDaysInLastNDays(allActivityDates, 30) / 30) * 100)
      : 0;
    const last7Days = countInLastNDays(allActivityDates, 7);
    const last30Days = countInLastNDays(allActivityDates, 30);

    return {
      realityChecksToday,
      realityChecksThisWeek,
      currentStreak,
      hasAnyActivity,
      consistencyPercent,
      last7Days,
      last30Days,
    };
  }, [realityChecks, completions, entries]);

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/awareness">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Awareness Progress"
            description="A clear, honest look at how consistently you're training your awareness."
          />

          <AwarenessNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <AwarenessStats
                realityChecksToday={stats.realityChecksToday}
                realityChecksThisWeek={stats.realityChecksThisWeek}
                exercisesCompleted={totalCompletions}
                consistencyPercent={stats.consistencyPercent}
                currentStreak={stats.currentStreak}
              />

              {stats.hasAnyActivity ? (
                <div className="mt-12">
                  <SectionHeading>Activity</SectionHeading>
                  <ActivityBreakdown last7Days={stats.last7Days} last30Days={stats.last30Days} />
                </div>
              ) : (
                <div className="mt-12">
                  <EmptyState
                    icon="📈"
                    message="Start practicing reality checks or daily exercises to see your progress here."
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}