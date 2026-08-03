import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type { EveningReflectionEntry } from "@/types/sleep";

function mapRow(row: {
  id: string;
  entry_date: string;
  text: string | null;
  updated_at: string;
}): EveningReflectionEntry {
  return {
    id: row.id,
    date: row.entry_date,
    text: row.text ?? "",
    updatedAt: row.updated_at,
  };
}

export async function getEveningReflectionsFromDatabase(): Promise<EveningReflectionEntry[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("evening_reflections")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function saveTodayEveningReflectionInDatabase(
  text: string
): Promise<EveningReflectionEntry> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("evening_reflections")
    .upsert(
      {
        user_id: user.id,
        entry_date: todayKey(),
        text: text.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,entry_date" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function deleteEveningReflectionFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("evening_reflections")
    .delete()
    .eq("id", id);

  if (error) throw error;
}