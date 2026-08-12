import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import SomniaCTA from "@/components/seo/SomniaCTA";

export const metadata: Metadata = {
  title: "How to Improve Dream Recall",
  description:
    "Learn practical ways to remember more of your dreams, build better dream recall habits, and use dream journaling to support lucid dreaming.",
};

export default function DreamRecallPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <ArticleJsonLd
  title="How to Improve Dream Recall"
  description="Learn practical ways to remember more of your dreams, build better dream recall habits, and use dream journaling to support lucid dreaming."
  path="/learn/dream-recall"
/>
      <article className="mx-auto max-w-4xl">
        <SomniaCTA />
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          How to Improve Dream Recall
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Dream recall is the ability to remember your dreams after waking.
          Strong dream recall is an important foundation for lucid dreaming
          because recognizing and studying your dreams becomes much easier when
          you can remember them consistently.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Keep a Dream Journal
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Record whatever you remember as soon as you wake up. Even a single
          image, emotion, person, or location is worth writing down. Over time,
          this creates a habit of paying attention to your dreams.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Stay Still When You Wake
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          When you wake, avoid immediately jumping into other activities.
          Spend a moment thinking about what you were just experiencing. Moving
          your attention away from the dream too quickly can make details harder
          to recall.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Capture Small Details
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          You do not need to remember an entire dream. Start with whatever
          remains in your memory and write down details such as places, people,
          emotions, conversations, colors, and unusual events.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Review Your Dreams
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Reviewing previous entries can help you notice recurring themes and
          dream patterns. Those patterns can later become useful reminders
          during your lucid dreaming practice.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">
          Be Consistent
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Dream recall tends to benefit from consistency. Keep the process
          simple enough that you can continue recording your dreams regularly
          rather than treating it as an occasional activity.
        </p>

        <div className="mt-16 rounded-2xl border border-[#5B6EFF] bg-[#0B1225] p-8">
          <h2 className="text-2xl font-semibold">
            Start Remembering Your Dreams
          </h2>

          <p className="mt-4 text-slate-300">
            SOMNIA gives you a dedicated place to record your dreams and build
            better recall habits over time.
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

  <Link
    href="/learn/reality-checks"
    className="text-[#7C8CFF] hover:underline"
  >
    Reality Checks →
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