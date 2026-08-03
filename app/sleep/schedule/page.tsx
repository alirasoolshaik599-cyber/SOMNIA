"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SleepNav from "@/components/sleep/SleepNav";
import SleepScheduleCard from "@/components/sleep/SleepScheduleCard";
import { useSleepSchedule } from "@/hooks/useSleepSchedule";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function SchedulePage() {
  const {
    schedule,
    hasLoaded,
    setBedtime,
    setWakeTime,
  } = useSleepSchedule();

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Sleep Schedule"
            description="A consistent schedule supports the deep, stable sleep lucid dreaming relies on."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
              <SleepScheduleCard
                bedtime={schedule.bedtime}
                wakeTime={schedule.wakeTime}
                onBedtimeChange={(time) =>
                  requireAuth(() => setBedtime(time))
                }
                onWakeTimeChange={(time) =>
                  requireAuth(() => setWakeTime(time))
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}