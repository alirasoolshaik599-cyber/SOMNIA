"use client";

import Link from "next/link";

type AuthRequiredModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

export default function AuthRequiredModal({
  open,
  onClose,
  title = "Save your journey",
  description = "Create a free account to save your dreams, sync across devices, and continue your progress anywhere.",
}: AuthRequiredModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative mx-5 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A] shadow-2xl">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#5B6EFF]/20 blur-3xl" />

        <div className="relative p-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5B6EFF]/15 text-3xl">
            ✨
          </div>

          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            {description}
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/signup"
              className="flex h-12 items-center justify-center rounded-xl bg-[#5B6EFF] font-medium text-white transition hover:bg-[#7282ff]"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="flex h-12 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-[#5B6EFF] hover:text-white"
            >
              Log In
            </Link>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full text-sm text-slate-500 transition hover:text-white"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}