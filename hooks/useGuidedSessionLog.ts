"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { GuidedSessionEntry, ReadinessLevel } from "@/types/induction";
import {
  getGuidedSessionEntriesFromDatabase,
  saveTodayGuidedSessionEntryInDatabase,
} from "@/lib/database/guidedSessionLog";

type NewGuidedSessionInput = {
  readiness?: ReadinessLevel;
  approachesTried?: string[];
  notes: string;
};

// idPrefix is kept for call-site compatibility; entry ids now come from the
// database instead of being generated client-side.
export function useGuidedSessionLog(storageKey: string, _idPrefix: string) {
  const [entries, setEntries] = useState<GuidedSessionEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const dbEntries = await getGuidedSessionEntriesFromDatabase(storageKey);
        setEntries(dbEntries);
      } catch (err) {
        console.error(`Failed to load guided session log (${storageKey}):`, err);
        setEntries([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTodayEntry = useCallback(
    async (input: NewGuidedSessionInput): Promise<GuidedSessionEntry> => {
      const saved = await saveTodayGuidedSessionEntryInDatabase(storageKey, input);

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

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  const practicedDates = useMemo(() => entries.map((e) => e.date), [entries]);
  const lastEntry = sortedEntries[0];

  return { entries: sortedEntries, hasLoaded, saveTodayEntry, practicedDates, lastEntry };
}