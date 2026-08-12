import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "How to Lucid Dream",
  description:
    "Learn how to lucid dream with practical techniques, dream recall, reality checks, and beginner-friendly training from SOMNIA.",
};

export default function HowToLucidDreamPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="How to Lucid Dream"
  description="Learn how to lucid dream with practical techniques, dream recall, reality checks, and beginner-friendly training from SOMNIA."
  path="/learn/how-to-lucid-dream"
/>
      <article className="mx-auto max-w-4xl">
        <SomniaCTA />
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Lucid dreaming is the ability to become aware that you are dreaming
          while the dream is still happening. Once you recognize the dream, you
          can often influence your actions and experience the dream consciously.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 1 — Improve Dream Recall
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          The first step is remembering your dreams. If you cannot remember your
          dreams, becoming lucid becomes much harder. Write down every dream as
          soon as you wake up.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 2 — Keep a Dream Journal
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          Recording your dreams daily helps your brain recognize recurring
          dream patterns and improves long-term dream recall.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 3 — Practice Reality Checks
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          Ask yourself several times a day whether you are dreaming. Build this
          habit while awake so it carries into your dreams.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Step 4 — Stay Consistent
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          Lucid dreaming is a skill that develops through repetition. Consistent
          practice is far more effective than trying many techniques for a
          single night.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Start Your Lucid Dream Journey
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA helps you record dreams, improve dream recall, and build the
            daily habits required for lucid dreaming.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-[#5B6EFF] px-6 py-3 font-medium hover:bg-[#7080FF] transition"
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
    href="/learn/reality-checks"
    className="text-[#7C8CFF] hover:underline"
  >
    Learn Reality Checks →
  </Link>

  <Link
    href="/learn/mild-technique"
    className="text-[#7C8CFF] hover:underline"
  >
    Learn MILD →
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