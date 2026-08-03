"use client";

type MultiSelectPillsProps = {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  ariaLabel: string;
};

export default function MultiSelectPills({
  options,
  selectedValues,
  onToggle,
  ariaLabel,
}: MultiSelectPillsProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            aria-pressed={isSelected}
            className={`flex min-h-[44px] items-center rounded-full border px-4 text-sm transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] ${
              isSelected
                ? "border-[#5B6EFF] bg-[#5B6EFF]/20 text-[#a9b3ff]"
                : "border-white/10 bg-black/30 text-slate-300 hover:bg-black/50"
            }`}
          >
            {isSelected && (
              <span className="mr-1.5" aria-hidden="true">
                ✓
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}