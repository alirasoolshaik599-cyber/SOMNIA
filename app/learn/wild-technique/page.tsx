import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "WILD Technique for Lucid Dreaming",
  description:
    "Learn the basics of the WILD lucid dreaming technique, how it works, and how to approach it safely and patiently as part of a lucid dreaming routine.",
};

export default function WildTechniquePage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="WILD Technique for Lucid Dreaming"
  description="Learn the basics of the WILD lucid dreaming technique, how it works, and how to approach it safely and patiently as part of a lucid dreaming routine."
  path="/learn/wild-technique"
/>
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-[#7C8CFF]">
          <SomniaCTA />
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          WILD Technique for Lucid Dreaming
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          WILD, or Wake-Initiated Lucid Dreaming, is an approach where a person
          attempts to maintain awareness while transitioning from wakefulness
          into a dream. It generally requires patience, relaxation, and a good
          understanding of your own sleep patterns.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          What Is WILD?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Instead of becoming lucid after a dream has already started, WILD
          focuses on maintaining awareness during the transition into sleep.
          The goal is to allow the body to fall asleep while your attention
          remains calm and observant.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Choose the Right Time
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          WILD is often easier when you are naturally sleepy but able to remain
          relaxed and attentive. Trying to force the technique when you are
          highly alert can make falling asleep more difficult.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Relax Without Forcing Sleep
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Lie comfortably and allow your body to relax. Keep your attention
          gentle rather than concentrating intensely. The objective is not to
          prevent sleep, but to maintain a small amount of awareness while you
          drift toward it.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Stay Calm During the Transition
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          As you become sleepier, you may notice changes in your thoughts,
          imagery, sounds, or sense of your surroundings. Do not become
          overly excited or try to control every sensation. Let the transition
          happen naturally.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Be Patient
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          WILD can take practice. Difficulty falling asleep, losing awareness,
          or simply falling asleep normally are all possible outcomes. Treat
          each attempt as practice rather than expecting a lucid dream every
          time.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Build Your Dream Practice
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA helps you record dreams, recognize patterns, and build the
            awareness habits that support your lucid dreaming journey.
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
    href="/learn/mild-technique"
    className="text-[#7C8CFF] hover:underline"
  >
    MILD Technique →
  </Link>

  <Link
    href="/learn/common-mistakes"
    className="text-[#7C8CFF] hover:underline"
  >
    Common Mistakes →
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