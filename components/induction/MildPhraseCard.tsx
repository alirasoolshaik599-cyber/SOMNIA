"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { mildPhrasePresets } from "@/lib/mildContent";

type MildPhraseCardProps = {
  currentText: string;
  onSave: (text: string) => void;
};

export default function MildPhraseCard({ currentText, onSave }: MildPhraseCardProps) {
  const [text, setText] = useState(currentText);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(currentText);
  }, [currentText]);

  const handleSave = (value: string) => {
    if (!value.trim()) return;
    onSave(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
      {currentText && (
        <div className="mb-6 rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Your MILD Phrase
          </p>
          <p className="mt-2 text-lg font-bold text-white">&ldquo;{currentText}&rdquo;</p>
        </div>
      )}

      <p className="mb-3 text-lg font-medium text-white">Choose a phrase</p>
      <div className="flex flex-col gap-2" role="group" aria-label="Suggested phrases">
        {mildPhrasePresets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setText(preset);
              handleSave(preset);
            }}
            className="flex min-h-[44px] items-center rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-left text-sm text-slate-300 transition-all duration-300 active:scale-[0.99] hover:border-[#5B6EFF]/40 hover:bg-[#5B6EFF]/20 hover:text-[#a9b3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
          >
            &ldquo;{preset}&rdquo;
          </button>
        ))}
      </div>

      <div className="mt-6">
        <TextField
          label="Or write your own"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave(text);
          }}
          placeholder="e.g. Tonight I'll know I'm dreaming."
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Button onClick={() => handleSave(text)}>Save Phrase</Button>
        <span role="status" aria-live="polite" className="text-sm text-[#a9b3ff]">
          {saved ? "Saved ✓" : ""}
        </span>
      </div>
    </div>
  );
}