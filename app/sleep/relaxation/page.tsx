"use client";

import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SectionHeading from "@/components/ui/SectionHeading";
import SleepNav from "@/components/sleep/SleepNav";
import RelaxationExerciseCard from "@/components/sleep/RelaxationExerciseCard";
import { useRelaxationExercises } from "@/hooks/useRelaxationExercises";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { relaxationExercises } from "@/lib/relaxationContent";

export default function RelaxationPage() {
  const { hasLoaded, isDoneToday, markDoneToday } = useRelaxationExercises();

  const { requireAuth } = useAuthContext();

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/sleep">← Hub</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Evening Relaxation"
            description="Simple, calming exercises to settle the body before sleep. No timers, no pressure — just presence."
          />

          <SleepNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <div className="mt-12">
              <SectionHeading>Tonight&apos;s Options</SectionHeading>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {relaxationExercises.map((exercise) => (
                  <RelaxationExerciseCard
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
          )}
        </div>
      </div>
    </main>
  );
}