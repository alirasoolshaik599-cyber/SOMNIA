import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type {
  PracticeLogEntry,
  NewPracticeLogInput,
  PracticeConfidence,
} from "@/types/induction";

function mapRow(row: {
  id: string;
  entry_date: string;
  practiced: boolean;
  confidence: string;
  notes: string | null;
}): PracticeLogEntry {
  return {
    id: row.id,
    date: row.entry_date,
    practiced: row.practiced,
    confidence: row.confidence as PracticeConfidence,
    notes: row.notes ?? "",
  };
}

export async function getPracticeLogEntriesFromDatabase(
  category: string
): Promise<PracticeLogEntry[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("practice_log_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("category", category)
    .order("entry_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function saveTodayPracticeLogEntryInDatabase(
  category: string,
  input: NewPracticeLogInput
): Promise<PracticeLogEntry> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("practice_log_entries")
    .upsert(
      {
        user_id: user.id,
        category,
        entry_date: todayKey(),
        practiced: input.practiced,
        confidence: input.confidence,
        notes: input.notes.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,category,entry_date" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function deletePracticeLogEntryFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("practice_log_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
}