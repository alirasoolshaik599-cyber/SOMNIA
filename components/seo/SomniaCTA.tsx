import Link from "next/link";

export default function SomniaCTA() {
  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-[#5B6EFF]/40 bg-gradient-to-br from-[#0B1225] via-[#0A1020] to-[#11183A] p-8 shadow-[0_0_50px_rgba(91,110,255,0.12)]">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8B98FF]">
          SOMNIA
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Turn lucid dreaming into a practice.
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
          SOMNIA is a lucid-dreaming training platform where you can record
          dreams, build awareness, improve recall, and develop your practice.
        </p>

        <Link
          href="https://somnia-delta-five.vercel.app/"
          className="mt-6 inline-flex items-center rounded-xl bg-[#6D7CFF] px-7 py-3 font-semibold text-white shadow-lg shadow-[#5B6EFF]/20 transition hover:-translate-y-0.5 hover:bg-[#7C8CFF]"
        >
          Enter SOMNIA →
        </Link>
      </div>
    </section>
  );
}