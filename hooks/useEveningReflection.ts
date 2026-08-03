"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { EveningReflectionEntry } from "@/types/sleep";
import { todayKey } from "@/lib/awareness";
import {
  getEveningReflectionsFromDatabase,
  saveTodayEveningReflectionInDatabase,
  deleteEveningReflectionFromDatabase,
} from "@/lib/database/eveningReflection";

export function useEveningReflection() {
  const [entries, setEntries] = useState<EveningReflectionEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const dbEntries = await getEveningReflectionsFromDatabase();
        setEntries(dbEntries);
      } catch (err) {
        console.error("Failed to load evening reflections:", err);
        setEntries([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadEntries();
  }, []);

  const getTodayEntry = useCallback(
    (): EveningReflectionEntry | undefined => entries.find((e) => e.date === todayKey()),
    [entries]
  );

  const saveTodayEntry = useCallback(
    async (text: string): Promise<EveningReflectionEntry> => {
      const saved = await saveTodayEveningReflectionInDatabase(text);

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
    await deleteEveningReflectionFromDatabase(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  return { entries: sortedEntries, hasLoaded, saveTodayEntry, deleteEntry, getTodayEntry };
}