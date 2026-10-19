"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import type { DreamAnalysis } from "@/types/dream";

type Status = "idle" | "loading" | "done" | "error";

type DreamInsightsProps = {
  dreamId: string;
  // Analysis already saved in the database (if any)
  initialAnalysis?: DreamAnalysis | null;
};

export default function DreamInsights({
  dreamId,
  initialAnalysis = null,
}: DreamInsightsProps) {
  const [status, setStatus] = useState<Status>(
    initialAnalysis ? "done" : "idle"
  );
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(
    initialAnalysis
  );
  // Saved results show instantly; only fresh results fade in.
  const [visible, setVisible] = useState(Boolean(initialAnalysis));
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnalyze = async () => {
    setStatus("loading");
    setVisible(false);
    setErrorMessage("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please sign in to analyze your dreams.");
      }

      const res = await fetch("/api/analyze-dream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ dreamId }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Couldn't analyze this dream.");
      }

      const data: DreamAnalysis = await res.json();
      setAnalysis(data);
      setStatus("done");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Couldn't analyze this dream."
      );
      setStatus("error");
    }
  };

  const result = status === "done" ? analysis : null;

  const cards = [
    {
      icon: "🎭",
      title: "Mood",
      content: result ? result.mood : "Not analyzed yet.",
    },
    {
      icon: "🔑",
      title: "Symbols",
      content: result ? result.symbols.join(", ") : "Not analyzed yet.",
    },
    {
      icon: "🧵",
      title: "Themes",
      content: result ? result.themes.join(", ") : "Not analyzed yet.",
    },
    {
      icon: "💫",
      title: "Lucidity",
      content: result ? result.lucidity : "Not analyzed yet.",
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
              result
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
      {result && (
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
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {result.reflection}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        {status === "error" && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}

        <Button onClick={handleAnalyze} disabled={status === "loading"}>
          {status === "loading"
            ? "Analyzing..."
            : analysis
            ? "✨ Re-Analyze Dream"
            : "✨ Analyze Dream"}
        </Button>
      </div>
    </div>
  );
}