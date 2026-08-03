"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { DreamIntention } from "@/types/sleep";
import { todayKey } from "@/lib/awareness";
import {
  getDreamIntentionFromDatabase,
  saveDreamIntentionInDatabase,
} from "@/lib/database/dreamIntention";

export function useDreamIntention() {
  const [intention, setIntentionState] = useState<DreamIntention | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadIntention() {
      try {
        const dbIntention = await getDreamIntentionFromDatabase();
        setIntentionState(dbIntention);
      } catch (err) {
        console.error("Failed to load dream intention:", err);
        setIntentionState(null);
      } finally {
        setHasLoaded(true);
      }
    }

    loadIntention();
  }, []);

  const setIntention = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;

    const saved = await saveDreamIntentionInDatabase(text);
    setIntentionState(saved);
  }, []);

  const isSetToday = useMemo(
    () => intention !== null && intention.date === todayKey() && intention.text.length > 0,
    [intention]
  );

  return { intention, hasLoaded, setIntention, isSetToday };
}