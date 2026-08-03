"use client";

import { useMemo } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import HubCard from "@/components/ui/HubCard";
import SleepNav from "@/components/sleep/SleepNav";
import ReadinessDashboard from "@/components/sleep/ReadinessDashboard";
import { useRoutine } from "@/hooks/useRoutine";
import { useSleepSchedule } from "@/hooks/useSleepSchedule";
import { useDreamIntention } from "@/hooks/useDreamIntention";
import { useRelaxationExercises } from "@/hooks/useRelaxationExercises";
import { usePreSleepChecklist } from "@/hooks/usePreSleepChecklist";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { todayKey } from "@/lib/awareness";
import {
  computeSleepDurationMinutes,
  formatDuration,
  formatTimeLabel,
  buildPreSleepChecklistItems,
} from "@/lib/sleep";
import { relaxationExercises } from "@/lib/relaxationContent";

export default function SleepHubPage() {
  const { items: routineItems, hasLoaded: routineLoaded } = useRoutine();
  const { schedule, hasLoaded: scheduleLoaded } = useSleepSchedule();
  const { intention, isSetToday, hasLoaded: intentionLoaded } = useDreamIntention();
  const { hasLoaded: relaxationLoaded, isDoneToday: isRelaxationDoneToday } =
    useRelaxationExercises();
  const { completedItemIds, hasLoaded: checklistLoaded } = usePreSleepChecklist();
  const { realityChecks, hasLoaded: rcLoaded } = useRealityChecks();

  const hasLoaded =
    routineLoaded &&
    scheduleLoaded &&
    intentionLoaded &&
    relaxationLoaded &&
    checklistLoaded &&
    rcLoaded;

  const today = todayKey();

  const routineDoneToday = useMemo(
    () => routineItems.filter((i) => i.doneDates.includes(today)).length,
    [routineItems, today]
  );

  const durationLabel = useMemo(
    () => formatDuration(computeSleepDurationMinutes(schedule.bedtime, schedule.wakeTime)),
    [schedule]
  );

  const scheduleSummary = `${formatTimeLabel(schedule.bedtime)} → ${formatTimeLabel(
    schedule.wakeTime
  )}`;

  const relaxationDoneToday = useMemo(
    () => relaxationExercises.filter((ex) => isRelaxationDoneToday(ex.id)).length,
    [isRelaxationDoneToday]
  );

  const realityChecksDoneToday = realityChecks.some((rc) => rc.doneDates.includes(today));

  const checklistItems = useMemo(
    () => buildPreSleepChecklistItems(completedItemIds, realityChecksDoneToday, isSetToday),
    [completedItemIds, realityChecksDoneToday, isSetToday]
  );
  const checklistCompleted = checklistItems.filter((i) => i.checked).length;

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Sleep Preparation"
            description="Calm the mind and body before sleep — the groundwork lucid dreaming is built on."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12">
                <ReadinessDashboard
                  routineDoneToday={routineDoneToday}
                  routineTotal={routineItems.length}
                  scheduleSummary={scheduleSummary}
                  scheduleDurationLabel={durationLabel}
                  intentionSet={isSetToday}
                  intentionText={intention?.text ?? null}
                  relaxationDoneToday={relaxationDoneToday}
                  relaxationTotal={relaxationExercises.length}
                  checklistCompleted={checklistCompleted}
                  checklistTotal={checklistItems.length}
                />
              </div>

              <div className="mt-10 space-y-5">
                <HubCard
                  href="/sleep/routine"
                  icon="🌙"
                  title="Bedtime Routine"
                  description="A calm, repeatable wind-down before sleep."
                  stat={
                    routineItems.length === 0
                      ? "No routine items yet"
                      : `${routineDoneToday}/${routineItems.length} completed tonight`
                  }
                />

                <HubCard
                  href="/sleep/schedule"
                  icon="⏰"
                  title="Sleep Schedule"
                  description="Set your bedtime and wake time."
                  stat={`${durationLabel} planned tonight`}
                />

                <HubCard
                  href="/sleep/intention"
                  icon="🎯"
                  title="Dream Incubation"
                  description="Decide what you want to dream about tonight."
                  stat={isSetToday && intention ? `"${intention.text}"` : "Not set yet"}
                />

                <HubCard
                  href="/sleep/relaxation"
                  icon="🕯️"
                  title="Evening Relaxation"
                  description="Short, calming exercises to settle the body."
                  stat={`${relaxationDoneToday}/${relaxationExercises.length} completed tonight`}
                />

                <HubCard
                  href="/sleep/reflection"
                  icon="🪞"
                  title="Evening Reflection"
                  description="A calm moment to reflect on your day."
                />

                <HubCard
                  href="/sleep/checklist"
                  icon="✅"
                  title="Pre-Sleep Checklist"
                  description="A final, calming check before you close your eyes."
                  stat={`${checklistCompleted}/${checklistItems.length} ready`}
                />

                <HubCard
                  href="/sleep/quality-log"
                  icon="📋"
                  title="Sleep Quality Log"
                  description="A quick morning log of how you slept."
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}