import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "Common Lucid Dreaming Mistakes",
  description:
    "Learn the most common lucid dreaming mistakes beginners make and how to build a more consistent and effective dream practice.",
};

export default function CommonMistakesPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="Common Lucid Dreaming Mistakes"
  description="Learn the most common lucid dreaming mistakes beginners make and how to build a more consistent and effective dream practice."
  path="/learn/common-mistakes"
/>
      <article className="mx-auto max-w-4xl">
        <SomniaCTA />
        
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Common Lucid Dreaming Mistakes
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Learning to lucid dream takes practice. Many beginners make the same
          mistakes, such as expecting immediate results, neglecting dream
          recall, or trying too many techniques at once. Understanding these
          mistakes can make your practice more consistent.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Expecting Results Immediately
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Lucid dreaming does not work on exactly the same schedule for
          everyone. Becoming frustrated after a few unsuccessful attempts can
          make it harder to maintain a consistent routine.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Ignoring Dream Recall
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Remembering dreams is an important foundation for lucid dreaming.
          Without recording and reviewing dreams, you may miss recurring
          patterns that could help you recognize when you are dreaming.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Trying Too Many Techniques
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Jumping between different techniques every night can make it
          difficult to understand what works best for you. Give a method enough
          consistent practice before deciding whether it fits your routine.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Treating Reality Checks as a Mechanical Habit
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Performing a reality check without actually questioning your state
          can turn it into an automatic action. Slow down and genuinely ask
          yourself whether you could be dreaming.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Getting Too Excited When Lucid
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Realizing that you are dreaming can be exciting. Staying calm and
          focusing on the experience can help you avoid immediately losing
          awareness.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Giving Up Too Quickly
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          A consistent routine is more useful than constantly chasing quick
          results. Track your progress, learn from your dreams, and gradually
          refine your approach.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Build a Better Dream Practice
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA helps you record dreams, recognize patterns, and develop the
            habits that support your lucid dreaming journey.
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
    href="/learn/wild-technique"
    className="text-[#7C8CFF] hover:underline"
  >
    WILD Technique →
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