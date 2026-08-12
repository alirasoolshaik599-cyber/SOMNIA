import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "MILD Technique for Lucid Dreaming",
  description:
    "Learn how the MILD lucid dreaming technique works, how to practice it, and how to combine it with dream recall and consistent sleep habits.",
};

export default function MildTechniquePage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="MILD Technique for Lucid Dreaming"
  description="Learn how the MILD lucid dreaming technique works, how to practice it, and how to combine it with dream recall and consistent sleep habits."
  path="/learn/mild-technique"
/>
      <article className="mx-auto max-w-4xl">
        <SomniaCTA />
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          MILD Technique for Lucid Dreaming
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          MILD, or Mnemonic Induction of Lucid Dreams, is a lucid dreaming
          technique based on remembering an intention to recognize that you are
          dreaming. It is commonly practiced around sleep and can be combined
          with strong dream recall habits.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          What Is the MILD Technique?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          The basic idea is to form a clear intention to recognize your next
          dream. You mentally rehearse the moment of becoming aware that you
          are dreaming and reinforce that intention before returning to sleep.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 1 — Remember a Recent Dream
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          After waking, recall a recent dream in as much detail as possible.
          Think about the setting, events, and anything unusual that happened.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 2 — Identify a Dream Sign
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Look for something unusual or recurring in the dream. This can become
          a reminder that helps you recognize the dream state in the future.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 3 — Rehearse Your Intention
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Imagine yourself back in the dream. Visualize noticing the dream sign
          and realizing that you are dreaming. Repeat your intention to
          recognize the next dream while maintaining a calm focus.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 4 — Practice Consistently
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Like other lucid dreaming methods, MILD benefits from consistency.
          Keeping track of your dreams can help you become more familiar with
          recurring patterns and improve your ability to remember your practice.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Build Your Lucid Dreaming Practice
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA helps you record dreams and build the awareness habits that
            support your lucid dreaming journey.
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
    href="/learn/how-to-lucid-dream"
    className="text-[#7C8CFF] hover:underline"
  >
    How to Lucid Dream →
  </Link>

  <Link
    href="/learn/reality-checks"
    className="text-[#7C8CFF] hover:underline"
  >
    Reality Checks →
  </Link>

  <Link
    href="/learn/dream-recall"
    className="text-[#7C8CFF] hover:underline"
  >
    Improve Dream Recall →
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