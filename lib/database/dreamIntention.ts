import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type { DreamIntention } from "@/types/sleep";

function mapRow(row: {
  text: string;
  intention_date: string;
  updated_at: string;
}): DreamIntention {
  return {
    text: row.text,
    date: row.intention_date,
    updatedAt: row.updated_at,
  };
}

export async function getDreamIntentionFromDatabase(): Promise<DreamIntention | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("dream_intentions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function saveDreamIntentionInDatabase(text: string): Promise<DreamIntention> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("dream_intentions")
    .upsert(
      {
        user_id: user.id,
        text: text.trim(),
        intention_date: todayKey(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}