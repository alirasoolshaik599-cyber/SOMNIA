import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";

export async function getTodayChecklistCompletionsFromDatabase(): Promise<string[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("pre_sleep_checklist_completions")
    .select("item_id")
    .eq("user_id", user.id)
    .eq("completed_date", todayKey());

  if (error) throw error;

  return (data ?? []).map((row) => row.item_id);
}

export async function addChecklistCompletionInDatabase(itemId: string): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { error } = await supabase.from("pre_sleep_checklist_completions").upsert(
    {
      user_id: user.id,
      item_id: itemId,
      completed_date: todayKey(),
    },
    { onConflict: "user_id,item_id,completed_date", ignoreDuplicates: true }
  );

  if (error) throw error;
}

export async function removeChecklistCompletionInDatabase(itemId: string): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { error } = await supabase
    .from("pre_sleep_checklist_completions")
    .delete()
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("completed_date", todayKey());

  if (error) throw error;
}