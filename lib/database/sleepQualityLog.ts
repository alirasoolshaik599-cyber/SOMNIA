import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type {
  SleepQualityEntry,
  NewSleepQualityInput,
  DreamRecallRating,
} from "@/types/sleep";

function mapRow(row: {
  id: string;
  entry_date: string;
  sleep_quality: number;
  dream_recall: string;
  had_lucid_dream: boolean;
  note: string | null;
}): SleepQualityEntry {
  return {
    id: row.id,
    date: row.entry_date,
    sleepQuality: row.sleep_quality,
    dreamRecall: row.dream_recall as DreamRecallRating,
    hadLucidDream: row.had_lucid_dream,
    note: row.note ?? "",
  };
}

export async function getSleepQualityEntriesFromDatabase(): Promise<SleepQualityEntry[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("sleep_quality_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function saveTodaySleepQualityEntryInDatabase(
  input: NewSleepQualityInput
): Promise<SleepQualityEntry> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("sleep_quality_entries")
    .upsert(
      {
        user_id: user.id,
        entry_date: todayKey(),
        sleep_quality: input.sleepQuality,
        dream_recall: input.dreamRecall,
        had_lucid_dream: input.hadLucidDream,
        note: input.note.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,entry_date" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function deleteSleepQualityEntryFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("sleep_quality_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
}