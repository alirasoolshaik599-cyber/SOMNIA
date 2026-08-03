import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { todayKey } from "@/lib/awareness";
import type { RelaxationCompletion } from "@/types/sleep";

export async function getRelaxationCompletionsFromDatabase(): Promise<RelaxationCompletion[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("relaxation_completions")
    .select("exercise_id, completed_date")
    .eq("user_id", user.id);

  if (error) throw error;

  const grouped = new Map<string, string[]>();

  for (const row of data ?? []) {
    const dates = grouped.get(row.exercise_id) ?? [];
    dates.push(row.completed_date);
    grouped.set(row.exercise_id, dates);
  }

  return Array.from(grouped.entries()).map(([exerciseId, doneDates]) => ({
    exerciseId,
    doneDates,
  }));
}

export async function markRelaxationExerciseDoneInDatabase(exerciseId: string): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { error } = await supabase.from("relaxation_completions").upsert(
    {
      user_id: user.id,
      exercise_id: exerciseId,
      completed_date: todayKey(),
    },
    { onConflict: "user_id,exercise_id,completed_date", ignoreDuplicates: true }
  );

  if (error) throw error;
}