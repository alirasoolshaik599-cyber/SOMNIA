"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

type NavLink = {
  href: string;
  label: string;
  icon: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/journal", label: "Dream Journal", icon: "📖" },
  { href: "/awareness", label: "Awareness", icon: "🧠" },
  { href: "/sleep", label: "Sleep", icon: "🌙" },
  { href: "/induction", label: "Induction", icon: "✨" },
  { href: "/mastery", label: "Mastery", icon: "🚀" },
];

export default function GlobalNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const drawer = document.getElementById("global-nav-drawer");
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled])'
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
      >
        <span className="flex flex-col gap-[3px]">
          <span className="h-0.5 w-5 bg-white rounded-full" />
          <span className="h-0.5 w-5 bg-white rounded-full" />
          <span className="h-0.5 w-5 bg-white rounded-full" />
        </span>
      </button>

      {open && (
        <div
          id="global-nav-drawer"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#0b1024] px-6 py-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  SOMNIA
                </h2>

                <p className="mt-1 text-xs tracking-[0.25em] text-slate-500 uppercase">
                  Explore Consciousness
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <nav className="mt-10 space-y-2">
              {navLinks.map((link, index) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-[#5B6EFF]/15 text-[#a9b3ff]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">
                      {link.icon}
                    </span>

                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <UserMenu />

              <p className="mt-8 text-center text-xs text-slate-600">
                SOMNIA v0.1
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}