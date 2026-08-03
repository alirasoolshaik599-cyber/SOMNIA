"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getTodayChecklistCompletionsFromDatabase,
  addChecklistCompletionInDatabase,
  removeChecklistCompletionInDatabase,
} from "@/lib/database/preSleepChecklist";

export function usePreSleepChecklist() {
  const [completedItemIds, setCompletedItemIds] = useState<string[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadCompletions() {
      try {
        const ids = await getTodayChecklistCompletionsFromDatabase();
        setCompletedItemIds(ids);
      } catch (err) {
        console.error("Failed to load pre-sleep checklist:", err);
        setCompletedItemIds([]);
      } finally {
        setHasLoaded(true);
      }
    }

    loadCompletions();
  }, []);

  const toggleItem = useCallback(
    async (id: string): Promise<void> => {
      const alreadyDone = completedItemIds.includes(id);

      if (alreadyDone) {
        await removeChecklistCompletionInDatabase(id);
        setCompletedItemIds((prev) => prev.filter((i) => i !== id));
      } else {
        await addChecklistCompletionInDatabase(id);
        setCompletedItemIds((prev) => [...prev, id]);
      }
    },
    [completedItemIds]
  );

  return { completedItemIds, hasLoaded, toggleItem };
}