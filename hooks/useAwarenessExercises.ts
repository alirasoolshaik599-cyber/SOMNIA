"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { ExerciseCompletion } from "@/types/awareness";
import { todayKey } from "@/lib/awareness";
import {
  getAwarenessExerciseCompletionsFromDatabase,
  markAwarenessExerciseDoneInDatabase,
} from "@/lib/database/awarenessExercises";

export function useAwarenessExercises() {
  const [completions, setCompletions] = useState<ExerciseCompletion[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadCompletions() {
      try {
        const dbCompletions = await getAwarenessExerciseCompletionsFromDatabase();
        setCompletions(dbCompletions);
      } catch (err) {
        console.error("Failed to load awareness exercise completions:", err);
        setCompletions([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadCompletions();
  }, []);

  const getDoneDates = useCallback(
    (exerciseId: string): string[] =>
      completions.find((c) => c.exerciseId === exerciseId)?.doneDates ?? [],
    [completions]
  );

  const isDoneToday = useCallback(
    (exerciseId: string): boolean => getDoneDates(exerciseId).includes(todayKey()),
    [getDoneDates]
  );

  const markDoneToday = useCallback(
    async (exerciseId: string): Promise<void> => {
      const key = todayKey();

      if (getDoneDates(exerciseId).includes(key)) return;

      await markAwarenessExerciseDoneInDatabase(exerciseId);

      setCompletions((prev) => {
        const existing = prev.find((c) => c.exerciseId === exerciseId);
        if (!existing) {
          return [...prev, { exerciseId, doneDates: [key] }];
        }
        if (existing.doneDates.includes(key)) return prev;
        return prev.map((c) =>
          c.exerciseId === exerciseId ? { ...c, doneDates: [...c.doneDates, key] } : c
        );
      });
    },
    [getDoneDates]
  );

  const totalCompletions = useMemo(
    () => completions.reduce((sum, c) => sum + c.doneDates.length, 0),
    [completions]
  );

  return {
    completions,
    hasLoaded,
    getDoneDates,
    isDoneToday,
    markDoneToday,
    totalCompletions,
  };
}