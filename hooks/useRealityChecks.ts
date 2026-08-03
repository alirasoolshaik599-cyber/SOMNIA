"use client";

import { useState, useEffect, useCallback } from "react";
import type { RealityCheck, NewRealityCheckInput } from "@/types/awareness";
import { todayKey } from "@/lib/awareness";
import { defaultRealityCheckTechniques } from "@/lib/awarenessContent";
import {
  getRealityChecksFromDatabase,
  seedDefaultRealityChecksInDatabase,
  createRealityCheckInDatabase,
  updateRealityCheckInDatabase,
  deleteRealityCheckFromDatabase,
  setRealityCheckEnabledInDatabase,
  setRealityCheckDoneDatesInDatabase,
} from "@/lib/database/realityChecks";

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `rc-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Local-only fallback used when the user is signed out or a database call
// fails — keeps the page usable exactly like the old localStorage default.
function buildDefaultRealityChecks(): RealityCheck[] {
  const createdAt = todayKey();
  return defaultRealityCheckTechniques.map((technique) => ({
    id: generateId(),
    label: technique.label,
    description: technique.description,
    whyItWorks: technique.whyItWorks,
    howTo: technique.howTo,
    enabled: true,
    isCustom: false,
    createdAt,
    doneDates: [],
  }));
}

export function useRealityChecks() {
  const [realityChecks, setRealityChecks] = useState<RealityCheck[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadRealityChecks() {
      try {
        const dbChecks = await getRealityChecksFromDatabase();

        if (dbChecks.length > 0) {
          setRealityChecks(dbChecks);
        } else {
          try {
            const seeded = await seedDefaultRealityChecksInDatabase();
            setRealityChecks(seeded.length > 0 ? seeded : buildDefaultRealityChecks());
          } catch (seedErr) {
            // Signed-out users (or a transient failure) fall back to local
            // defaults so the page still renders something useful.
            if ((seedErr as Error)?.message !== "User not authenticated.") {
            console.error("Failed to seed default reality checks:", seedErr);
            }
            setRealityChecks(buildDefaultRealityChecks());
          }
        }
      } catch (err) {
        console.error("Failed to load reality checks:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
        setRealityChecks(buildDefaultRealityChecks());
      } finally {
        setHasLoaded(true);
      }
    }

    loadRealityChecks();
  }, []);

  const addRealityCheck = useCallback(
    async (input: NewRealityCheckInput): Promise<RealityCheck> => {
      const created = await createRealityCheckInDatabase(input);
      setRealityChecks((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const updateRealityCheck = useCallback(
    async (id: string, input: NewRealityCheckInput): Promise<void> => {
      await updateRealityCheckInDatabase(id, input);
      setRealityChecks((prev) =>
        prev.map((rc) =>
          rc.id === id
            ? { ...rc, label: input.label.trim(), description: input.description.trim() }
            : rc
        )
      );
    },
    []
  );

  const deleteRealityCheck = useCallback(async (id: string): Promise<void> => {
    await deleteRealityCheckFromDatabase(id);
    setRealityChecks((prev) => prev.filter((rc) => rc.id !== id));
  }, []);

  const toggleEnabled = useCallback(
    async (id: string): Promise<void> => {
      const target = realityChecks.find((rc) => rc.id === id);
      if (!target) return;

      const nextEnabled = !target.enabled;
      await setRealityCheckEnabledInDatabase(id, nextEnabled);

      setRealityChecks((prev) =>
        prev.map((rc) => (rc.id === id ? { ...rc, enabled: nextEnabled } : rc))
      );
    },
    [realityChecks]
  );

  const toggleDoneToday = useCallback(
    async (id: string): Promise<void> => {
      const target = realityChecks.find((rc) => rc.id === id);
      if (!target) return;

      const key = todayKey();
      const alreadyDone = target.doneDates.includes(key);
      const nextDoneDates = alreadyDone
        ? target.doneDates.filter((d) => d !== key)
        : [...target.doneDates, key];

      await setRealityCheckDoneDatesInDatabase(id, nextDoneDates);

      setRealityChecks((prev) =>
        prev.map((rc) => (rc.id === id ? { ...rc, doneDates: nextDoneDates } : rc))
      );
    },
    [realityChecks]
  );

  const getRealityCheckById = useCallback(
    (id: string): RealityCheck | undefined => realityChecks.find((rc) => rc.id === id),
    [realityChecks]
  );

  return {
    realityChecks,
    hasLoaded,
    addRealityCheck,
    updateRealityCheck,
    deleteRealityCheck,
    toggleEnabled,
    toggleDoneToday,
    getRealityCheckById,
  };
}