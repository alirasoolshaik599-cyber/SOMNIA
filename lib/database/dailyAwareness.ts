import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type { DailyAwarenessEntry, NewDailyAwarenessInput } from "@/types/awareness";

function mapRow(row: {
  id: string;
  entry_date: string;
  awareness_rating: number;
  note: string | null;
}): DailyAwarenessEntry {
  return {
    id: row.id,
    date: row.entry_date,
    awarenessRating: row.awareness_rating,
    note: row.note ?? "",
  };
}

export async function getDailyAwarenessEntriesFromDatabase(): Promise<DailyAwarenessEntry[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("daily_awareness_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function saveTodayDailyAwarenessEntryInDatabase(
  input: NewDailyAwarenessInput
): Promise<DailyAwarenessEntry> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("daily_awareness_entries")
    .upsert(
      {
        user_id: user.id,
        entry_date: todayKey(),
        awareness_rating: input.awarenessRating,
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

export async function deleteDailyAwarenessEntryFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("daily_awareness_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
}