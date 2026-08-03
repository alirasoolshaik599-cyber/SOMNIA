import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "./auth";
import { defaultRealityCheckTechniques } from "@/lib/awarenessContent";
import type { RealityCheck, NewRealityCheckInput } from "@/types/awareness";

function mapRow(row: {
  id: string;
  label: string;
  description: string | null;
  why_it_works: string | null;
  how_to: string | null;
  enabled: boolean;
  is_custom: boolean;
  created_at: string;
  done_dates: string[] | null;
}): RealityCheck {
  return {
    id: row.id,
    label: row.label,
    description: row.description ?? "",
    whyItWorks: row.why_it_works ?? "",
    howTo: row.how_to ?? "",
    enabled: row.enabled,
    isCustom: row.is_custom,
    createdAt: row.created_at,
    doneDates: row.done_dates ?? [],
  };
}

export async function getRealityChecksFromDatabase(): Promise<RealityCheck[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("reality_checks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function seedDefaultRealityChecksInDatabase(): Promise<RealityCheck[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const rows = defaultRealityCheckTechniques.map((technique) => ({
    user_id: user.id,
    label: technique.label,
    description: technique.description,
    why_it_works: technique.whyItWorks,
    how_to: technique.howTo,
    enabled: true,
    is_custom: false,
    done_dates: [],
  }));

  const { data, error } = await supabase
    .from("reality_checks")
    .insert(rows)
    .select();

  if (error) throw error;

  return (data ?? []).map(mapRow);
}

export async function createRealityCheckInDatabase(
  input: NewRealityCheckInput
): Promise<RealityCheck> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("reality_checks")
    .insert({
      user_id: user.id,
      label: input.label.trim(),
      description: input.description.trim(),
      why_it_works: "",
      how_to: "",
      enabled: true,
      is_custom: true,
      done_dates: [],
    })
    .select()
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function updateRealityCheckInDatabase(
  id: string,
  input: NewRealityCheckInput
): Promise<void> {
  const { error } = await supabase
    .from("reality_checks")
    .update({
      label: input.label.trim(),
      description: input.description.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteRealityCheckFromDatabase(id: string): Promise<void> {
  const { error } = await supabase
    .from("reality_checks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function setRealityCheckEnabledInDatabase(
  id: string,
  enabled: boolean
): Promise<void> {
  const { error } = await supabase
    .from("reality_checks")
    .update({
      enabled,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function setRealityCheckDoneDatesInDatabase(
  id: string,
  doneDates: string[]
): Promise<void> {
  const { error } = await supabase
    .from("reality_checks")
    .update({
      done_dates: doneDates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}