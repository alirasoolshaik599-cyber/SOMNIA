"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import DreamJournal from "@/components/dream/DreamJournal";
import DreamStats from "@/components/dream/DreamStats";
import { useDreams } from "@/hooks/useDreams";

export default function JournalPage() {
  const router = useRouter();
  const { dreams, hasLoaded, deleteDream, toggleFavorite } = useDreams();
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredDreams = query
    ? dreams.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.dream.toLowerCase().includes(query) ||
          d.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    : dreams;

  const sortedDreams = [...filteredDreams].sort((a, b) => {
    if (a.favorite === b.favorite) return 0;
    return a.favorite ? -1 : 1;
  });

  const realDreams = dreams.filter((d) => d.id !== "welcome");

  const totalDreams = realDreams.length;
  const favoriteDreams = realDreams.filter((d) => d.favorite).length;

  const uniqueTags = new Set<string>();
  realDreams.forEach((d) => d.tags.forEach((t) => uniqueTags.add(t.toLowerCase())));
  const totalTags = uniqueTags.size;

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const dreamsThisMonth = realDreams.filter((d) =>
    d.date.startsWith(currentMonthKey)
  ).length;

  const longest = realDreams.reduce<(typeof realDreams)[number] | null>(
    (max, d) => (!max || d.dream.length > max.dream.length ? d : max),
    null
  );

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav
          left={<PillLink href="/">← Home</PillLink>}
          right={
            <>
              <PillLink href="/timeline">Timeline</PillLink>
              <PillLink href="/dream/new" variant="primary">
                + New Dream
              </PillLink>
            </>
          }
        />

        <div className="mt-10 sm:mt-14">
          <PageHeader
            title="Dream Journal"
            description="Every dream you've captured, in one place."
          />

          <div className="mt-10 sm:mt-12">
            <label htmlFor="dream-search" className="sr-only">
              Search your dreams
            </label>
            <div className="relative">
              <input
                id="dream-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your dreams..."
                className="w-full rounded-2xl border border-white/20 bg-black/40 px-5 py-3.5 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#5B6EFF] sm:px-6 sm:py-4"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition-colors hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <DreamStats
            totalDreams={totalDreams}
            favoriteDreams={favoriteDreams}
            totalTags={totalTags}
            dreamsThisMonth={dreamsThisMonth}
            longestDreamTitle={longest ? longest.title : null}
            longestDreamLength={longest ? longest.dream.length : 0}
          />

          {!hasLoaded ? (
            <p className="mt-16 text-center text-slate-400">Loading...</p>
          ) : (
            <DreamJournal
              dreams={sortedDreams}
              onDelete={deleteDream}
              onEdit={(id) => router.push(`/dream/new?edit=${id}`)}
              onToggleFavorite={toggleFavorite}
              emptyMessage={query ? "No dreams found." : "No dreams saved yet."}
            />
          )}
        </div>
      </div>
    </main>
  );
}