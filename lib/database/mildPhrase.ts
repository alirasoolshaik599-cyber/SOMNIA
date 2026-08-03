import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import type { MildPhrase } from "@/types/induction";

function mapRow(row: { text: string; updated_at: string }): MildPhrase {
  return {
    text: row.text,
    updatedAt: row.updated_at,
  };
}

export async function getMildPhraseFromDatabase(): Promise<MildPhrase | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("mild_phrases")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function saveMildPhraseInDatabase(text: string): Promise<MildPhrase> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("mild_phrases")
    .upsert(
      {
        user_id: user.id,
        text: text.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}