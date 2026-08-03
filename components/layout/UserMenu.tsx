"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function UserMenu() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.push("/");
    router.refresh();

    setLoading(false);
  }

  // -------------------------
  // Guest Menu
  // -------------------------
  if (!user) {
    return (
      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          Guest
        </p>

        <div className="space-y-3">
          <Link
            href="/signup"
            className="flex h-11 items-center justify-center rounded-xl bg-[#5B6EFF] font-medium text-white transition hover:bg-[#7282ff]"
          >
            Create Account
          </Link>

          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-[#5B6EFF] hover:text-white"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------
  // Logged In Menu
  // -------------------------
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        Signed In
      </p>

      <p className="mt-2 truncate text-sm font-medium text-white">
        {user.email}
      </p>

      <div className="mt-5 space-y-3">
        <Link
          href="/settings"
          className="flex h-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-[#5B6EFF] hover:text-white"
        >
          Settings
        </Link>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex h-11 w-full items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}