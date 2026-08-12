import type { Metadata } from "next";
import Link from "next/link";
import SomniaCTA from "@/components/seo/SomniaCTA";

const guides = [
  {
    title: "How to Lucid Dream",
    description: "Learn the fundamentals of lucid dreaming, from dream recall to becoming aware inside your dreams.",
    href: "/learn/how-to-lucid-dream",
  },
  {
    title: "Dream Journal Guide",
    description: "Discover why recording dreams is the fastest way to improve dream recall and lucid dreaming frequency.",
    href: "/learn/dream-journal",
  },
  {
    title: "Reality Checks",
    description: "Master the habits that help you recognize when you're dreaming.",
    href: "/learn/reality-checks",
  },
  {
    title: "MILD Technique",
    description: "A step-by-step guide to the Mnemonic Induction of Lucid Dreams technique.",
    href: "/learn/mild-technique",
  },
  {
    title: "WILD Technique",
    description: "Learn how to transition directly from wakefulness into a lucid dream.",
    href: "/learn/wild-technique",
  },
  {
    title: "Dream Recall",
    description: "Improve your ability to remember dreams consistently every morning.",
    href: "/learn/dream-recall",
  },
  {
  title: "Common Lucid Dreaming Mistakes",
  description:
    "Learn the common mistakes beginners make and how to build a more consistent lucid dreaming practice.",
  href: "/learn/common-mistakes",
  },
];
export const metadata: Metadata = {
  title: "Lucid Dreaming Guides",
  description:
    "Explore practical guides to lucid dreaming, dream journaling, dream recall, reality checks, and lucid dreaming techniques.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SOMNIA Lucid Dreaming Guides",
  description:
    "Practical guides covering lucid dreaming, dream journaling, dream recall, reality checks, and lucid dreaming techniques.",
  url: "https://somnia-delta-five.vercel.app/learn",
};
export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
      
      <div className="mx-auto max-w-5xl">
        <SomniaCTA />
        
        <p className="text-sm font-medium text-[#7C8CFF]">
          SOMNIA LEARNING
        </p>

        <h1 className="mt-3 text-4xl font-bold">Lucid Dreaming Guides</h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Explore practical guides to lucid dreaming, dream journaling, dream
          recall, reality checks, and proven induction techniques. Everything
          here is designed to help you build awareness and become a better
          dreamer.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 transition hover:border-[#5B6EFF] hover:bg-slate-900"
            >
              <h2 className="text-xl font-semibold">{guide.title}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {guide.description}
              </p>

              <p className="mt-5 text-[#7C8CFF]">
                Read Guide →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}