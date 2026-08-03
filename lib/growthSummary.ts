// Pure, read-only aggregation over data the app's existing hooks already load.
// This module never touches localStorage or React — it only transforms arrays
// that are passed in, and returns a summary object for the UI to render.

import type { Dream } from "@/types/dream";
import type { RealityCheck, DailyAwarenessEntry } from "@/types/awareness";
import type {
  RoutineItem,
  RelaxationCompletion,
  EveningReflectionEntry,
  SleepQualityEntry,
} from "@/types/sleep";
import type { PracticeLogEntry, GuidedSessionEntry } from "@/types/induction";
import { computeLongestStreak } from "@/lib/awareness";
import { stabilizationTechniques } from "@/lib/stabilizationContent";

export type GrowthInputs = {
  dreams: Dream[];
  realityChecks: RealityCheck[];
  dailyAwarenessEntries: DailyAwarenessEntry[];
  routineItems: RoutineItem[];
  relaxationCompletions: RelaxationCompletion[];
  eveningReflections: EveningReflectionEntry[];
  sleepQualityEntries: SleepQualityEntry[];
  mildPracticeEntries: PracticeLogEntry[];
  mildGuidedSessions: GuidedSessionEntry[];
  wbtbPracticeEntries: PracticeLogEntry[];
  wbtbGuidedSessions: GuidedSessionEntry[];
  wildPracticeEntries: PracticeLogEntry[];
  wildGuidedSessions: GuidedSessionEntry[];
  stabilizationSessions: GuidedSessionEntry[];
};

export type GrowthSummary = {
  counts: {
    dreamsRecorded: number;
    awarenessSessions: number;
    sleepPreparationSessions: number;
    mildPractice: number;
    wbtbPractice: number;
    wildPractice: number;
    stabilizationPractice: number;
  };
  narrative: string[];
  insights: {
    mostPracticedTechnique?: { label: string; count: number };
    mostFrequentStabilizationMethod?: { label: string; count: number };
    longestPracticeStreak?: number;
  };
};

function sumDoneDates(items: { doneDates: string[] }[]): number {
  return items.reduce((sum, item) => sum + item.doneDates.length, 0);
}

// A "practiced day" for a technique counts either a manual log marked
// practiced=true, or a completed guided session — deduplicated by date, so
// doing both on the same night still counts once.
function countPracticedDays(
  practiceEntries: PracticeLogEntry[],
  guidedEntries: GuidedSessionEntry[]
): number {
  const dates = new Set<string>();
  practiceEntries.filter((e) => e.practiced).forEach((e) => dates.add(e.date));
  guidedEntries.forEach((e) => dates.add(e.date));
  return dates.size;
}

export function computeGrowthSummary(inputs: GrowthInputs): GrowthSummary {
  const dreamsRecorded = inputs.dreams.filter((d) => d.id !== "welcome").length;

  const awarenessSessions =
    sumDoneDates(inputs.realityChecks) + inputs.dailyAwarenessEntries.length;

  const sleepPreparationSessions =
    sumDoneDates(inputs.routineItems) +
    sumDoneDates(inputs.relaxationCompletions) +
    inputs.eveningReflections.length +
    inputs.sleepQualityEntries.length;

  const mildPractice = countPracticedDays(inputs.mildPracticeEntries, inputs.mildGuidedSessions);
  const wbtbPractice = countPracticedDays(inputs.wbtbPracticeEntries, inputs.wbtbGuidedSessions);
  const wildPractice = countPracticedDays(inputs.wildPracticeEntries, inputs.wildGuidedSessions);
  const stabilizationPractice = countPracticedDays([], inputs.stabilizationSessions);

  // Longest streak across every kind of activity in the app, not any single phase.
  const allActivityDates = [
    ...inputs.dreams.filter((d) => d.id !== "welcome").map((d) => d.date),
    ...inputs.realityChecks.flatMap((rc) => rc.doneDates),
    ...inputs.dailyAwarenessEntries.map((e) => e.date),
    ...inputs.routineItems.flatMap((r) => r.doneDates),
    ...inputs.relaxationCompletions.flatMap((c) => c.doneDates),
    ...inputs.eveningReflections.map((e) => e.date),
    ...inputs.sleepQualityEntries.map((e) => e.date),
    ...inputs.mildPracticeEntries.filter((e) => e.practiced).map((e) => e.date),
    ...inputs.mildGuidedSessions.map((e) => e.date),
    ...inputs.wbtbPracticeEntries.filter((e) => e.practiced).map((e) => e.date),
    ...inputs.wbtbGuidedSessions.map((e) => e.date),
    ...inputs.wildPracticeEntries.filter((e) => e.practiced).map((e) => e.date),
    ...inputs.wildGuidedSessions.map((e) => e.date),
    ...inputs.stabilizationSessions.map((e) => e.date),
  ];
  const longestPracticeStreak = computeLongestStreak(allActivityDates);

  // Most practiced induction technique — only reported if at least one has been practiced.
  const techniqueCounts = [
    { label: "MILD", count: mildPractice },
    { label: "WBTB", count: wbtbPractice },
    { label: "WILD", count: wildPractice },
  ];
  const mostPracticedTechnique = techniqueCounts
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)[0];

  // Most frequently selected stabilization approach, tallied from guided session reflections.
  const approachTally = new Map<string, number>();
  inputs.stabilizationSessions.forEach((session) => {
    (session.approachesTried ?? []).forEach((id) => {
      approachTally.set(id, (approachTally.get(id) ?? 0) + 1);
    });
  });
  let mostFrequentStabilizationMethod: { label: string; count: number } | undefined;
  approachTally.forEach((count, id) => {
    if (!mostFrequentStabilizationMethod || count > mostFrequentStabilizationMethod.count) {
      const label = stabilizationTechniques.find((t) => t.id === id)?.title ?? id;
      mostFrequentStabilizationMethod = { label, count };
    }
  });

  // Narrative observations — each only included if the data genuinely supports it.
  const candidates: { condition: boolean; text: string }[] = [
    {
      condition: dreamsRecorded >= 5,
      text: "You've built a consistent dream journaling habit.",
    },
    {
      condition: techniqueCounts.filter((t) => t.count > 0).length >= 2,
      text: "You've explored several induction techniques.",
    },
    {
      condition: longestPracticeStreak >= 3,
      text: "Your practice has become more regular over time.",
    },
    {
      condition: awarenessSessions >= 5,
      text: "You're building steady awareness habits during your day.",
    },
    {
      condition: sleepPreparationSessions >= 5,
      text: "You've been consistent with preparing for sleep.",
    },
    {
      condition: stabilizationPractice >= 1 && dreamsRecorded >= 1,
      text: "You've begun connecting dream recall with lucid dream skills.",
    },
  ];
  const narrative = candidates
    .filter((c) => c.condition)
    .map((c) => c.text)
    .slice(0, 3);

  return {
    counts: {
      dreamsRecorded,
      awarenessSessions,
      sleepPreparationSessions,
      mildPractice,
      wbtbPractice,
      wildPractice,
      stabilizationPractice,
    },
    narrative,
    insights: {
      mostPracticedTechnique,
      mostFrequentStabilizationMethod,
      longestPracticeStreak,
    },
  };
}