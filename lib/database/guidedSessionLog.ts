import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type { GuidedSessionEntry, ReadinessLevel } from "@/types/induction";

type NewGuidedSessionInput = {
  readiness?: ReadinessLevel;
  approachesTried?: string[];
  notes: string;
};

function mapRow(row: {
  id: string;
  entry_date: string;
  readiness: string | null;
  approaches_tried: string[] | null;
  notes: string | null;
}): GuidedSessionEntry {
  return {
    id: row.id,
    date: row.entry_date,
    readiness: (row.readiness as ReadinessLevel | null) ?? undefined,
    approachesTried: row.approaches_tried ?? undefined,
    notes: row.notes ?? "",
  };
}

export async function getGuidedSessionEntriesFromDatabase(category: string): Promise<GuidedSessionEntry[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("guided_session_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("category", category)
    .order("entry_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function saveTodayGuidedSessionEntryInDatabase(
  category: string,
  input: NewGuidedSessionInput
): Promise<GuidedSessionEntry> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("guided_session_entries")
    .upsert(
      {
        user_id: user.id,
        category,
        entry_date: todayKey(),
        readiness: input.readiness ?? null,
        approaches_tried: input.approachesTried ?? null,
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