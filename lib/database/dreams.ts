import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import type { Dream } from "@/types/dream";

type NewDreamInput = {
  title: string;
  dream: string;
  tags: string[];
};

export async function getDreamsFromDatabase(): Promise<Dream[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("dreams")
    .select("*")
    .eq("user_id", user.id)
    .order("dream_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((dream) => ({
    id: dream.id,
    title: dream.title,
    dream: dream.dream,
    date: dream.dream_date,
    favorite: dream.favorite,
    tags: dream.tags ?? [],
  }));
}

export async function createDreamInDatabase(
  input: NewDreamInput
): Promise<Dream> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("dreams")
    .insert({
      user_id: user.id,
      title: input.title.trim(),
      dream: input.dream.trim(),
      tags: input.tags,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    dream: data.dream,
    date: data.dream_date,
    favorite: data.favorite,
    tags: data.tags ?? [],
  };
}

export async function updateDreamInDatabase(
  id: string,
  input: NewDreamInput
): Promise<void> {
  const { error } = await supabase
    .from("dreams")
    .update({
      title: input.title.trim(),
      dream: input.dream.trim(),
      tags: input.tags,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteDreamFromDatabase(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("dreams")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function toggleFavoriteInDatabase(
  id: string,
  favorite: boolean
): Promise<void> {
  const { error } = await supabase
    .from("dreams")
    .update({
      favorite,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}