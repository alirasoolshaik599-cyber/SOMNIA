"use client";

import Link from "next/link";
import { useDreams } from "@/hooks/useDreams";
import type { Dream } from "@/types/dream";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";

function formatMonthHeader(groupKey: string): string {
  const [year, month] = groupKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatFullDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function groupDreamsByMonth(dreams: Dream[]): Map<string, Dream[]> {
  const sorted = [...dreams].sort((a, b) => b.date.localeCompare(a.date));

  const groups = new Map<string, Dream[]>();
  for (const d of sorted) {
    const key = d.date.slice(0, 7);
    const existing = groups.get(key);
    if (existing) {
      existing.push(d);
    } else {
      groups.set(key, [d]);
    }
  }

  return groups;
}

export default function TimelinePage() {
  const { dreams, hasLoaded } = useDreams();

  const realDreams = dreams.filter((d) => d.id !== "welcome");
  const grouped = groupDreamsByMonth(realDreams);

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav
          left={<PillLink href="/">← Home</PillLink>}
          right={<PillLink href="/journal">Journal →</PillLink>}
        />

        <div className="mt-10 sm:mt-14">
          <PageHeader title="Dream Timeline" description="Your dreams, moving through time." />

          {!hasLoaded ? (
            <p className="mt-16 text-center text-slate-400">Loading...</p>
          ) : realDreams.length === 0 ? (
            <div className="mt-16 flex flex-col items-center rounded-3xl border border-white/10 bg-black/35 px-6 py-14 text-center backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:px-8 sm:py-16">
              <span className="text-5xl">🌙</span>
              <h2 className="mt-6 text-2xl font-bold text-white">Your timeline is waiting</h2>
              <p className="mt-3 max-w-sm text-slate-400">
                Once you record your first dream, it&apos;ll appear here — organized
                beautifully by month and year.
              </p>
              <PillLink href="/dream/new" variant="primary" className="mt-8">
                + Record your first dream
              </PillLink>
            </div>
          ) : (
            <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-14">
              {Array.from(grouped.entries()).map(([groupKey, groupDreams]) => (
                <div key={groupKey}>
                  <div className="mb-5 flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {formatMonthHeader(groupKey)}
                    </h2>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="space-y-4">
                    {groupDreams.map((d) => (
                      <Link
                        key={d.id}
                        href={`/dream/${d.id}`}
                        className="block rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-[#5B6EFF]/30 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] sm:px-6"
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="flex min-w-0 items-center gap-2">
                            {d.favorite && <span className="shrink-0 text-yellow-300">★</span>}
                            <h3 className="truncate text-lg font-semibold text-white">
                              🌙 {d.title}
                            </h3>
                          </div>

                          <span className="shrink-0 text-sm text-slate-400">
                            {formatFullDate(d.date)}
                          </span>
                        </div>

                        {d.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {d.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-[#5B6EFF]/10 px-3 py-0.5 text-xs text-[#a9b3ff]"
                              >
                                {tag}
                              </span>
                            ))}
                            {d.tags.length > 3 && (
                              <span className="text-xs text-slate-500">
                                +{d.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}