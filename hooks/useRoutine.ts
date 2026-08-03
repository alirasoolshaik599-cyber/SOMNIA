"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { RoutineItem, NewRoutineItemInput } from "@/types/sleep";
import { todayKey } from "@/lib/awareness";
import { defaultRoutineLabels } from "@/lib/sleep";
import {
  getRoutineItemsFromDatabase,
  seedDefaultRoutineItemsInDatabase,
  createRoutineItemInDatabase,
  deleteRoutineItemFromDatabase,
  setRoutineItemDoneDatesInDatabase,
  swapRoutineItemOrderInDatabase,
} from "@/lib/database/routine";

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `routine-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Local-only fallback used when the user is signed out or a database call
// fails — keeps the page usable exactly like the old localStorage default.
function buildDefaultRoutine(): RoutineItem[] {
  const createdAt = todayKey();
  return defaultRoutineLabels.map((label, index) => ({
    id: generateId(),
    label,
    isCustom: false,
    order: index,
    createdAt,
    doneDates: [],
  }));
}

export function useRoutine() {
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadItems() {
      try {
        const dbItems = await getRoutineItemsFromDatabase();

        if (dbItems.length > 0) {
          setItems(dbItems);
        } else {
          try {
            const seeded = await seedDefaultRoutineItemsInDatabase();
            setItems(seeded.length > 0 ? seeded : buildDefaultRoutine());
          } catch (seedErr) {
            if ((seedErr as Error)?.message !== "User not authenticated.") {
            console.error("Failed to seed default routine:", seedErr);
            }
            setItems(buildDefaultRoutine());
          }
        }
      } catch (err) {
        console.error("Failed to load bedtime routine:", err);
        setItems(buildDefaultRoutine());
      } finally {
        setHasLoaded(true);
      }
    }

    loadItems();
  }, []);

  const addItem = useCallback(async (input: NewRoutineItemInput): Promise<void> => {
    const created = await createRoutineItemInDatabase(input);
    setItems((prev) => [...prev, created]);
  }, []);

  const deleteItem = useCallback(async (id: string): Promise<void> => {
    await deleteRoutineItemFromDatabase(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleDoneToday = useCallback(
    async (id: string): Promise<void> => {
      const target = items.find((i) => i.id === id);
      if (!target) return;

      const key = todayKey();
      const alreadyDone = target.doneDates.includes(key);
      const nextDoneDates = alreadyDone
        ? target.doneDates.filter((d) => d !== key)
        : [...target.doneDates, key];

      await setRoutineItemDoneDatesInDatabase(id, nextDoneDates);

      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, doneDates: nextDoneDates } : i))
      );
    },
    [items]
  );

  // Reordering swaps `order` values between two adjacent items rather than
  // reindexing the whole array — keeps unrelated items' identities stable.
  const moveItem = useCallback(
    async (id: string, direction: "up" | "down"): Promise<void> => {
      const sorted = [...items].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((i) => i.id === id);
      if (index === -1) return;

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= sorted.length) return;

      const current = sorted[index];
      const swapTarget = sorted[swapIndex];

      await swapRoutineItemOrderInDatabase(
        current.id,
        current.order,
        swapTarget.id,
        swapTarget.order
      );

      setItems((prev) =>
        prev.map((item) => {
          if (item.id === current.id) return { ...item, order: swapTarget.order };
          if (item.id === swapTarget.id) return { ...item, order: current.order };
          return item;
        })
      );
    },
    [items]
  );

  const sortedItems = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);

  return {
    items: sortedItems,
    hasLoaded,
    addItem,
    deleteItem,
    toggleDoneToday,
    moveItem,
  };
}