"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { SleepQualityEntry, NewSleepQualityInput } from "@/types/sleep";
import { todayKey } from "@/lib/awareness";
import {
  getSleepQualityEntriesFromDatabase,
  saveTodaySleepQualityEntryInDatabase,
  deleteSleepQualityEntryFromDatabase,
} from "@/lib/database/sleepQualityLog";

export function useSleepQualityLog() {
  const [entries, setEntries] = useState<SleepQualityEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const dbEntries = await getSleepQualityEntriesFromDatabase();
        setEntries(dbEntries);
      } catch (err) {
        console.error("Failed to load sleep quality log:", err);
        setEntries([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadEntries();
  }, []);

  const getTodayEntry = useCallback(
    (): SleepQualityEntry | undefined => entries.find((e) => e.date === todayKey()),
    [entries]
  );

  const saveTodayEntry = useCallback(
    async (input: NewSleepQualityInput): Promise<SleepQualityEntry> => {
      const saved = await saveTodaySleepQualityEntryInDatabase(input);

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
    await deleteSleepQualityEntryFromDatabase(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  return { entries: sortedEntries, hasLoaded, saveTodayEntry, deleteEntry, getTodayEntry };
}