import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { defaultRoutineLabels } from "@/lib/sleep";
import type { RoutineItem, NewRoutineItemInput } from "@/types/sleep";

function mapRow(row: {
  id: string;
  label: string;
  is_custom: boolean;
  order_index: number;
  created_at: string;
  done_dates: string[] | null;
}): RoutineItem {
  return {
    id: row.id,
    label: row.label,
    isCustom: row.is_custom,
    order: row.order_index,
    createdAt: row.created_at,
    doneDates: row.done_dates ?? [],
  };
}

export async function getRoutineItemsFromDatabase(): Promise<RoutineItem[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("routine_items")
    .select("*")
    .eq("user_id", user.id)
    .order("order_index", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function seedDefaultRoutineItemsInDatabase(): Promise<RoutineItem[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const rows = defaultRoutineLabels.map((label, index) => ({
    user_id: user.id,
    label,
    is_custom: false,
    order_index: index,
    done_dates: [],
  }));

  const { data, error } = await supabase
    .from("routine_items")
    .insert(rows)
    .select();

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function createRoutineItemInDatabase(
  input: NewRoutineItemInput
): Promise<RoutineItem> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data: existing, error: fetchError } = await supabase
    .from("routine_items")
    .select("order_index")
    .eq("user_id", user.id)
    .order("order_index", { ascending: false })
    .limit(1);

  if (fetchError) throw fetchError;

  const nextOrder = existing && existing.length > 0 ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase
    .from("routine_items")
    .insert({
      user_id: user.id,
      label: input.label.trim(),
      is_custom: true,
      order_index: nextOrder,
      done_dates: [],
    })
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function deleteRoutineItemFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("routine_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function setRoutineItemDoneDatesInDatabase(
  id: string,
  doneDates: string[]
): Promise<void> {
  const { error } = await supabase
    .from("routine_items")
    .update({
      done_dates: doneDates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function swapRoutineItemOrderInDatabase(
  itemAId: string,
  itemAOrder: number,
  itemBId: string,
  itemBOrder: number
): Promise<void> {
  const { error: errorA } = await supabase
    .from("routine_items")
    .update({ order_index: itemBOrder, updated_at: new Date().toISOString() })
    .eq("id", itemAId);

  if (errorA) throw errorA;

  const { error: errorB } = await supabase
    .from("routine_items")
    .update({ order_index: itemAOrder, updated_at: new Date().toISOString() })
    .eq("id", itemBId);

  if (errorB) throw errorB;
}