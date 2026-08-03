"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { PracticeLogEntry, NewPracticeLogInput } from "@/types/induction";
import { todayKey } from "@/lib/awareness";
import {
  getPracticeLogEntriesFromDatabase,
  saveTodayPracticeLogEntryInDatabase,
  deletePracticeLogEntryFromDatabase,
} from "@/lib/database/practiceLog";

// idPrefix is kept for call-site compatibility; entry ids now come from the
// database instead of being generated client-side.
export function usePracticeLog(storageKey: string, _idPrefix: string) {
  const [entries, setEntries] = useState<PracticeLogEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const dbEntries = await getPracticeLogEntriesFromDatabase(storageKey);
        setEntries(dbEntries);
      } catch (err) {
        console.error(`Failed to load practice log (${storageKey}):`, err);
        setEntries([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadEntries();
    // storageKey is expected to be a stable literal per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodayEntry = useCallback(
    (): PracticeLogEntry | undefined => entries.find((e) => e.date === todayKey()),
    [entries]
  );

  const saveTodayEntry = useCallback(
    async (input: NewPracticeLogInput): Promise<PracticeLogEntry> => {
      const saved = await saveTodayPracticeLogEntryInDatabase(storageKey, input);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    await deletePracticeLogEntryFromDatabase(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  return { entries: sortedEntries, hasLoaded, saveTodayEntry, deleteEntry, getTodayEntry };
}