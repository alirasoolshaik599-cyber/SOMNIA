"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { DailyAwarenessEntry, NewDailyAwarenessInput } from "@/types/awareness";
import { todayKey } from "@/lib/awareness";
import {
  getDailyAwarenessEntriesFromDatabase,
  saveTodayDailyAwarenessEntryInDatabase,
  deleteDailyAwarenessEntryFromDatabase,
} from "@/lib/database/dailyAwareness";

export function useDailyAwareness() {
  const [entries, setEntries] = useState<DailyAwarenessEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const dbEntries = await getDailyAwarenessEntriesFromDatabase();
        setEntries(dbEntries);
      } catch (err) {
        console.error("Failed to load daily awareness entries:", err);
        setEntries([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadEntries();
  }, []);

  const saveTodayEntry = useCallback(
    async (input: NewDailyAwarenessInput): Promise<DailyAwarenessEntry> => {
      const saved = await saveTodayDailyAwarenessEntryInDatabase(input);

      setEntries((prev) => {
        const existingIndex = prev.findIndex((e) => e.date === saved.date);

        if (existingIndex !== -1) {
          const next = [...prev];
          next[existingIndex] = saved;
          return next;
        }

        return [saved, ...prev];
      });

      return saved;
    },
    []
  );

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    await deleteDailyAwarenessEntryFromDatabase(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getTodayEntry = useCallback(
    (): DailyAwarenessEntry | undefined => entries.find((e) => e.date === todayKey()),
    [entries]
  );

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  return {
    entries: sortedEntries,
    hasLoaded,
    saveTodayEntry,
    deleteEntry,
    getTodayEntry,
  };
}