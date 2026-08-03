"use client";

import { useState, KeyboardEvent } from "react";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
};

export default function TagInput({
  tags,
  onChange,
  label = "Tags",
  placeholder = "Type a tag and press Enter...",
}: TagInputProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const newTag = tagInput.trim();
    if (!newTag) return;

    const alreadyExists = tags.some(
      (t) => t.toLowerCase() === newTag.toLowerCase()
    );
    if (!alreadyExists) {
      onChange([...tags, newTag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div>
      <label htmlFor="tag-input" className="mb-3 block text-lg font-medium text-white">
        {label}
      </label>

      <input
        id="tag-input"
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/20 bg-black/40 px-6 py-4 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#5B6EFF]"
      />

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-sm text-slate-300"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="rounded-full text-slate-400 transition-colors hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}