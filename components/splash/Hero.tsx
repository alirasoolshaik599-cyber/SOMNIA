"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-[0.3em] text-white sm:text-6xl sm:tracking-[0.5em] md:text-8xl md:tracking-[0.6em]">
        SOMNIA
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
        Discover the universe within.
      </p>

      <div className="mt-14">
        <Link href="/journal">
          <Button>Begin Journey</Button>
        </Link>
      </div>
    </div>
  );
}