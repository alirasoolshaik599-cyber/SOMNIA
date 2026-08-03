"use client";

import { useMemo } from "react";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import LoadingState from "@/components/ui/LoadingState";
import SectionHeading from "@/components/ui/SectionHeading";
import MasteryNav from "@/components/mastery/MasteryNav";
import JourneyNarrative from "@/components/mastery/JourneyNarrative";
import GrowthStatsGrid from "@/components/mastery/GrowthStatsGrid";
import GrowthInsights from "@/components/mastery/GrowthInsights";
import ContinueJourney from "@/components/mastery/ContinueJourney";
import { useDreams } from "@/hooks/useDreams";
import { useRealityChecks } from "@/hooks/useRealityChecks";
import { useDailyAwareness } from "@/hooks/useDailyAwareness";
import { useRoutine } from "@/hooks/useRoutine";
import { useRelaxationExercises } from "@/hooks/useRelaxationExercises";
import { useEveningReflection } from "@/hooks/useEveningReflection";
import { useSleepQualityLog } from "@/hooks/useSleepQualityLog";
import { usePracticeLog } from "@/hooks/usePracticeLog";
import { useGuidedSessionLog } from "@/hooks/useGuidedSessionLog";
import { computeGrowthSummary } from "@/lib/growthSummary";

const MILD_PRACTICE_LOG_KEY = "somnia_mild_practice_log";
const MILD_GUIDED_SESSIONS_KEY = "somnia_mild_guided_sessions";
const WBTB_PRACTICE_LOG_KEY = "somnia_wbtb_practice_log";
const WBTB_GUIDED_SESSIONS_KEY = "somnia_wbtb_guided_sessions";
const WILD_PRACTICE_LOG_KEY = "somnia_wild_practice_log";
const WILD_GUIDED_SESSIONS_KEY = "somnia_wild_guided_sessions";
const STABILIZATION_SESSIONS_KEY = "somnia_stabilization_sessions";

export default function PersonalGrowthPage() {
  // Every hook below is read-only in this page: no save/delete/toggle
  // function is ever called here, per the sprint's read-only requirement.
  const { dreams, hasLoaded: dreamsLoaded } = useDreams();
  const { realityChecks, hasLoaded: rcLoaded } = useRealityChecks();
  const { entries: dailyAwarenessEntries, hasLoaded: daLoaded } = useDailyAwareness();
  const { items: routineItems, hasLoaded: routineLoaded } = useRoutine();
  const { completions: relaxationCompletions, hasLoaded: relaxationLoaded } =
    useRelaxationExercises();
  const { entries: eveningReflections, hasLoaded: reflectionLoaded } = useEveningReflection();
  const { entries: sleepQualityEntries, hasLoaded: qualityLoaded } = useSleepQualityLog();

  const { entries: mildPracticeEntries, hasLoaded: mildPracticeLoaded } = usePracticeLog(
    MILD_PRACTICE_LOG_KEY,
    "mild-practice"
  );
  const { entries: mildGuidedSessions, hasLoaded: mildSessionsLoaded } = useGuidedSessionLog(
    MILD_GUIDED_SESSIONS_KEY,
    "mild-session"
  );
  const { entries: wbtbPracticeEntries, hasLoaded: wbtbPracticeLoaded } = usePracticeLog(
    WBTB_PRACTICE_LOG_KEY,
    "wbtb-practice"
  );
  const { entries: wbtbGuidedSessions, hasLoaded: wbtbSessionsLoaded } = useGuidedSessionLog(
    WBTB_GUIDED_SESSIONS_KEY,
    "wbtb-session"
  );
  const { entries: wildPracticeEntries, hasLoaded: wildPracticeLoaded } = usePracticeLog(
    WILD_PRACTICE_LOG_KEY,
    "wild-practice"
  );
  const { entries: wildGuidedSessions, hasLoaded: wildSessionsLoaded } = useGuidedSessionLog(
    WILD_GUIDED_SESSIONS_KEY,
    "wild-session"
  );
  const { entries: stabilizationSessions, hasLoaded: stabilizationLoaded } = useGuidedSessionLog(
    STABILIZATION_SESSIONS_KEY,
    "stabilization-session"
  );

  const hasLoaded =
    dreamsLoaded &&
    rcLoaded &&
    daLoaded &&
    routineLoaded &&
    relaxationLoaded &&
    reflectionLoaded &&
    qualityLoaded &&
    mildPracticeLoaded &&
    mildSessionsLoaded &&
    wbtbPracticeLoaded &&
    wbtbSessionsLoaded &&
    wildPracticeLoaded &&
    wildSessionsLoaded &&
    stabilizationLoaded;

  const summary = useMemo(
    () =>
      computeGrowthSummary({
        dreams,
        realityChecks,
        dailyAwarenessEntries,
        routineItems,
        relaxationCompletions,
        eveningReflections,
        sleepQualityEntries,
        mildPracticeEntries,
        mildGuidedSessions,
        wbtbPracticeEntries,
        wbtbGuidedSessions,
        wildPracticeEntries,
        wildGuidedSessions,
        stabilizationSessions,
      }),
    [
      dreams,
      realityChecks,
      dailyAwarenessEntries,
      routineItems,
      relaxationCompletions,
      eveningReflections,
      sleepQualityEntries,
      mildPracticeEntries,
      mildGuidedSessions,
      wbtbPracticeEntries,
      wbtbGuidedSessions,
      wildPracticeEntries,
      wildGuidedSessions,
      stabilizationSessions,
    ]
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/mastery">← Overview</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Personal Growth"
            description="A reflective look at your journey across SOMNIA — not a scoreboard, just a record."
          />

          <MasteryNav />

          {!hasLoaded ? (
            <LoadingState />
          ) : (
            <>
              <div className="mt-12">
                <JourneyNarrative narrative={summary.narrative} />
              </div>

              <div className="mt-14">
                <SectionHeading>Practice Summary</SectionHeading>
                <GrowthStatsGrid counts={summary.counts} />
              </div>

              {(summary.insights.mostPracticedTechnique ||
                summary.insights.mostFrequentStabilizationMethod ||
                (summary.insights.longestPracticeStreak ?? 0) > 1) && (
                <div className="mt-14">
                  <SectionHeading>Personal Insights</SectionHeading>
                  <GrowthInsights insights={summary.insights} />
                </div>
              )}

              <div className="mt-14">
                <SectionHeading>Continue Your Journey</SectionHeading>
                <ContinueJourney />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}