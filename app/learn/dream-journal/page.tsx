import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "Dream Journal Guide",
  description:
    "Learn how to keep a dream journal, improve dream recall, recognize recurring patterns, and use your dreams as part of lucid dreaming practice.",
};

export default function DreamJournalPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="Dream Journal Guide"
  description="Learn how to keep a dream journal, improve dream recall, recognize recurring patterns, and use your dreams as part of lucid dreaming practice."
  path="/learn/dream-journal"
/>
      <article className="mx-auto max-w-4xl">
        <SomniaCTA />
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Dream Journal Guide
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          A dream journal is one of the simplest tools for improving dream
          recall and becoming more familiar with your own dream patterns.
          Recording your dreams consistently can make details easier to
          remember and help you notice recurring themes.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Why Keep a Dream Journal?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Dreams are often forgotten quickly after waking. Writing down what
          you remember gives you a record to review later and encourages you
          to pay closer attention to your dreams.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          What Should You Record?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Start with whatever you can remember. Record people, places, events,
          emotions, unusual details, and anything that felt different from
          waking life. You do not need to remember an entire dream for the
          entry to be useful.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          When Should You Write?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Write your dream down as soon as possible after waking. Keep the
          process simple enough that you can maintain it every day.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Look for Dream Patterns
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          After recording dreams consistently, review your entries for
          recurring locations, people, situations, emotions, or unusual
          events. These patterns can become useful reminders during future
          dreams.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Start Recording Your Dreams
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA gives you a dedicated place to record and revisit your
            dreams while building better dream recall habits.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-[#5B6EFF] px-6 py-3 font-medium transition hover:bg-[#7080FF]"
          >
            Start with SOMNIA
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
  <Link
    href="/learn/dream-recall"
    className="text-[#7C8CFF] hover:underline"
  >
    Improve Dream Recall →
  </Link>

  <Link
    href="/learn/how-to-lucid-dream"
    className="text-[#7C8CFF] hover:underline"
  >
    How to Lucid Dream →
  </Link>
</div>  
        <div className="mt-12 border-t border-slate-800 pt-8">
          <Link
            href="/learn"
            className="text-[#7C8CFF] hover:underline"
          >
            ← Back to Lucid Dreaming Guides
          </Link>
        </div>
      </article>
    </main>
  );
}