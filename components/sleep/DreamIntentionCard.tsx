"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { defaultIntentionPresets } from "@/lib/sleep";

type DreamIntentionCardProps = {
  currentText: string;
  isSetToday: boolean;
  onSave: (text: string) => void;
};

export default function DreamIntentionCard({
  currentText,
  isSetToday,
  onSave,
}: DreamIntentionCardProps) {
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
      {isSetToday && currentText && (
        <div className="mb-6 rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Tonight&apos;s Intention
          </p>
          <p className="mt-2 text-xl font-bold text-white">{currentText}</p>
        </div>
      )}

      <p className="mb-3 text-lg font-medium text-white">Choose a starting point</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested intentions">
        {defaultIntentionPresets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setText(preset);
              handleSave(preset);
            }}
            className="flex min-h-[44px] items-center rounded-full border border-white/10 bg-black/30 px-4 text-sm text-slate-300 transition-all duration-300 active:scale-95 hover:border-[#5B6EFF]/40 hover:bg-[#5B6EFF]/20 hover:text-[#a9b3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
          >
            {preset}
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
          placeholder="e.g. Finding a hidden door"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Button onClick={() => handleSave(text)}>Set Intention</Button>
        <span role="status" aria-live="polite" className="text-sm text-[#a9b3ff]">
          {saved ? "Saved ✓" : ""}
        </span>
      </div>
    </div>
  );
}