"use client";

import { useState, useEffect, useCallback } from "react";
import type { SleepSchedule } from "@/types/sleep";
import {
  getSleepScheduleFromDatabase,
  saveSleepScheduleInDatabase,
} from "@/lib/database/sleepSchedule";

const defaultSchedule: SleepSchedule = {
  bedtime: "23:00",
  wakeTime: "07:00",
};

export function useSleepSchedule() {
  const [schedule, setSchedule] = useState<SleepSchedule>(defaultSchedule);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const dbSchedule = await getSleepScheduleFromDatabase();

        if (dbSchedule) {
          setSchedule(dbSchedule);
        } else {
          try {
            const saved = await saveSleepScheduleInDatabase(defaultSchedule);
            setSchedule(saved);
          } catch (seedErr) {
            if ((seedErr as Error)?.message !== "User not authenticated.") {
            console.error("Failed to seed default sleep schedule:", seedErr);
            }
            setSchedule(defaultSchedule);
          }
        }
      } catch (err) {
        console.error("Failed to load sleep schedule:", err);
        setSchedule(defaultSchedule);
      } finally {
        setHasLoaded(true);
      }
    }

    loadSchedule();
  }, []);

  const setBedtime = useCallback(
    async (bedtime: string): Promise<void> => {
      const saved = await saveSleepScheduleInDatabase({ ...schedule, bedtime });
      setSchedule(saved);
    },
    [schedule]
  );

  const setWakeTime = useCallback(
    async (wakeTime: string): Promise<void> => {
      const saved = await saveSleepScheduleInDatabase({ ...schedule, wakeTime });
      setSchedule(saved);
    },
    [schedule]
  );

  return { schedule, hasLoaded, setBedtime, setWakeTime };
}