"use client";

import { useState, useEffect, useCallback } from "react";
import type { MildPhrase } from "@/types/induction";
import {
  getMildPhraseFromDatabase,
  saveMildPhraseInDatabase,
} from "@/lib/database/mildPhrase";

export function useMildPhrase() {
  const [phrase, setPhraseState] = useState<MildPhrase | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadPhrase() {
      try {
        const dbPhrase = await getMildPhraseFromDatabase();
        setPhraseState(dbPhrase);
      } catch (err) {
        console.error("Failed to load MILD phrase:", err);
        setPhraseState(null);
      } finally {
        setHasLoaded(true);
      }
    }

    loadPhrase();
  }, []);

  const setPhrase = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;

    const saved = await saveMildPhraseInDatabase(text);
    setPhraseState(saved);
  }, []);

  return { phrase, hasLoaded, setPhrase };
}