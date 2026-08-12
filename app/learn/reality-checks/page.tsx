import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";

export const metadata: Metadata = {
  title: "Reality Checks for Lucid Dreaming",
  description:
    "Learn how reality checks work, how to practice them effectively, and how they can help you recognize when you are dreaming.",
};

export default function RealityChecksPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="Reality Checks for Lucid Dreaming"
  description="Learn how reality checks work, how to practice them effectively, and how they can help you recognize when you are dreaming."
  path="/learn/reality-checks"
/>
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Reality Checks for Lucid Dreaming
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          A reality check is a habit of questioning whether you are awake or
          dreaming. Practiced consistently during waking life, reality checks
          can eventually become part of your dream behavior and help you notice
          that you are dreaming.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          What Is a Reality Check?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Dreams can feel completely real while they are happening. A reality
          check gives you a deliberate moment to stop and examine your
          surroundings instead of automatically assuming that you are awake.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          How to Practice Reality Checks
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Choose a simple check that you can perform regularly. When you do it,
          do not rush through the motion. Pause, examine your surroundings, and
          genuinely ask yourself whether you could be dreaming.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Make the Habit Meaningful
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Repeating a reality check mechanically is less useful than actually
          questioning your state. Use moments that naturally make you curious,
          such as seeing something unusual, entering a familiar location, or
          noticing a recurring situation.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Combine Reality Checks With Dream Recall
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Reality checks work best as part of a broader lucid dreaming routine.
          Keeping a dream journal can help you identify recurring dream
          patterns that you can use as reminders to question whether you are
          dreaming.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Build Your Lucid Dreaming Routine
          </h2>

          <p className="mt-4 text-slate-300">
            Use SOMNIA to record your dreams and build the awareness habits that
            support your lucid dreaming practice.
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
    href="/learn/dream-journal"
    className="text-[#7C8CFF] hover:underline"
  >
    Dream Journal Guide →
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