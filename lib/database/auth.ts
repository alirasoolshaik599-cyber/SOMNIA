import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // No active session is an expected state (e.g. a signed-out visitor
    // browsing the app) — treat it as "no user" instead of throwing.
    if (error.name === "AuthSessionMissingError") {
      return null;
    }
    throw error;
  }

  return user;
}