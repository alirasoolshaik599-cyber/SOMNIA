import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import type { SleepSchedule } from "@/types/sleep";

function mapRow(row: { bedtime: string; wake_time: string }): SleepSchedule {
  return {
    bedtime: row.bedtime,
    wakeTime: row.wake_time,
  };
}

export async function getSleepScheduleFromDatabase(): Promise<SleepSchedule | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("sleep_schedules")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function saveSleepScheduleInDatabase(
  schedule: SleepSchedule
): Promise<SleepSchedule> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("sleep_schedules")
    .upsert(
      {
        user_id: user.id,
        bedtime: schedule.bedtime,
        wake_time: schedule.wakeTime,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}