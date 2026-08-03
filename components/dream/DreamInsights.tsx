"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type DreamAnalysis = {
  mood: string;
  symbols: string[];
  themes: string[];
  lucidity: string;
  reflection: string;
};

// Mock analysis presets. Swap getRandomAnalysis() for a real API call later —
// every card and the animation below stay unchanged as long as the shape matches.
const mockAnalyses: DreamAnalysis[] = [
  {
    mood: "Curious & Adventurous",
    symbols: ["Ocean", "Flying", "Stars"],
    themes: ["Freedom", "Exploration", "Self Discovery"],
    lucidity: "Low",
    reflection:
      "This dream may represent a desire for freedom, exploration, and discovering new possibilities.",
  },
  {
    mood: "Calm & Reflective",
    symbols: ["Water", "Moonlight", "Old House"],
    themes: ["Memory", "Nostalgia", "Letting Go"],
    lucidity: "Moderate",
    reflection:
      "This dream may reflect a quiet processing of the past, and a search for comfort in familiar places.",
  },
  {
    mood: "Anxious & Alert",
    symbols: ["Chase", "Locked Door", "Falling"],
    themes: ["Uncertainty", "Control", "Avoidance"],
    lucidity: "Low",
    reflection:
      "This dream may point to unresolved tension or a feeling of being pursued by pressures in waking life.",
  },
  {
    mood: "Joyful & Light",
    symbols: ["Sunlight", "Reunion", "Music"],
    themes: ["Connection", "Celebration", "Belonging"],
    lucidity: "High",
    reflection:
      "This dream may signal a deep appreciation for the people and moments that bring you a sense of belonging.",
  },
  {
    mood: "Mysterious & Introspective",
    symbols: ["Mirror", "Fog", "Maze"],
    themes: ["Identity", "Self-Reflection", "Hidden Truths"],
    lucidity: "Moderate",
    reflection:
      "This dream may suggest you're working through questions about who you are and what you're searching for.",
  },
];

function getRandomAnalysis(exclude?: DreamAnalysis): DreamAnalysis {
  const options = exclude
    ? mockAnalyses.filter((a) => a !== exclude)
    : mockAnalyses;
  return options[Math.floor(Math.random() * options.length)];
}

type Status = "idle" | "loading" | "done";

export default function DreamInsights() {
  const [status, setStatus] = useState<Status>("idle");
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [visible, setVisible] = useState(false);

  const handleAnalyze = () => {
    setStatus("loading");
    setVisible(false);

    setTimeout(() => {
      const next = getRandomAnalysis(analysis ?? undefined);
      setAnalysis(next);
      setStatus("done");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 2500);
  };

  const cards = [
    {
      icon: "🎭",
      title: "Mood",
      content: status === "done" && analysis ? analysis.mood : "Not analyzed yet.",
    },
    {
      icon: "🔑",
      title: "Symbols",
      content:
        status === "done" && analysis ? analysis.symbols.join(", ") : "Not analyzed yet.",
    },
    {
      icon: "🧵",
      title: "Themes",
      content:
        status === "done" && analysis ? analysis.themes.join(", ") : "Not analyzed yet.",
    },
    {
      icon: "💫",
      title: "Lucidity",
      content: status === "done" && analysis ? analysis.lucidity : "Not analyzed yet.",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-white">✨ Dream Insights</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-live="polite">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-[1.02] hover:border-[#5B6EFF]/30 hover:shadow-[0_0_35px_rgba(91,110,255,0.25)]"
            style={
              status === "done"
                ? {
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: `${index * 80}ms`,
                  }
                : undefined
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">{card.icon}</span>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            </div>

            {status === "loading" ? (
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
            ) : (
              <p className="mt-3 text-sm text-slate-400">{card.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* AI Reflection */}
      {status === "done" && analysis && (
        <div
          className="mt-4 rounded-3xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-6 backdrop-blur-md transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "320ms",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">🪞</span>
            <h3 className="text-lg font-semibold text-white">AI Reflection</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{analysis.reflection}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button onClick={handleAnalyze} disabled={status === "loading"}>
          {status === "loading"
            ? "Analyzing..."
            : status === "done"
            ? "✨ Re-Analyze Dream"
            : "✨ Analyze Dream"}
        </Button>
      </div>
    </div>
  );
}