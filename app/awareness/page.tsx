"use client";

import { useMemo } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import AwarenessNav from "@/components/awareness/AwarenessNav";
import HubCard from "@/components/ui/HubCard";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { useDailyAwareness } from "@/hooks/useDailyAwareness";
import { useAwarenessExercises } from "@/hooks/useAwarenessExercises";
import { computeStreak, todayKey } from "@/lib/awareness";
import { awarenessExercises } from "@/lib/awarenessContent";

export default function AwarenessHubPage() {
  const { realityChecks, hasLoaded: rcLoaded } = useRealityChecks();
  const { entries, hasLoaded: daLoaded } = useDailyAwareness();
  const { hasLoaded: exLoaded, isDoneToday } = useAwarenessExercises();

  const hasLoaded = rcLoaded && daLoaded && exLoaded;

  const activeChecks = useMemo(() => realityChecks.filter((rc) => rc.enabled), [realityChecks]);

  const longestCurrentStreak = useMemo(
    () => activeChecks.reduce((max, rc) => Math.max(max, computeStreak(rc.doneDates)), 0),
    [activeChecks]
  );

  const todayLogged = useMemo(() => entries.some((e) => e.date === todayKey()), [entries]);

  const exercisesDoneToday = useMemo(
    () => awarenessExercises.filter((ex) => isDoneToday(ex.id)).length,
    [isDoneToday]
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Awareness Training"
            description="Build the habit of noticing you're awake — the foundation of lucid dreaming."
          />

          <AwarenessNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12 space-y-5">
              <HubCard
                href="/awareness/reality-checks"
                icon="🔎"
                title="Reality Checks"
                description="Question your reality throughout the day, mindfully."
                stat={
                  activeChecks.length === 0
                    ? "No active reality checks"
                    : `${activeChecks.length} active · ${longestCurrentStreak} day streak`
                }
              />

              <HubCard
                href="/awareness/daily"
                icon="🌤️"
                title="Daily Awareness"
                description="Short exercises plus a daily check-in."
                stat={`${exercisesDoneToday}/${awarenessExercises.length} exercises today${
                  todayLogged ? " · Logged today ✓" : ""
                }`}
              />

              <HubCard
                href="/awareness/progress"
                icon="📈"
                title="Progress"
                description="See how your awareness practice is building over time."
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}