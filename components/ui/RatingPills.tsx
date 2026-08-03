"use client";

type RatingPillsProps = {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
};

export default function RatingPills({
  options,
  selectedValue,
  onSelect,
  ariaLabel,
}: RatingPillsProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={isSelected}
            className={`min-h-[44px] rounded-full border px-4 text-xs transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] sm:text-sm ${
              isSelected
                ? "border-[#5B6EFF] bg-[#5B6EFF]/20 text-[#a9b3ff]"
                : "border-white/10 bg-black/30 text-slate-300 hover:bg-black/50"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}