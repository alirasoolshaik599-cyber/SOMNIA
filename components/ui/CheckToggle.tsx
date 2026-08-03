"use client";

type CheckToggleProps = {
  checked: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  label: string;
};

export default function CheckToggle({ checked, onToggle, disabled = false, label }: CheckToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={checked}
      aria-label={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] ${
        checked
          ? "border-[#5B6EFF] bg-[#5B6EFF] text-white"
          : "border-white/20 bg-black/30 text-transparent"
      } ${disabled ? "cursor-default" : "active:scale-90 hover:border-[#5B6EFF]/50"}`}
    >
      ✓
    </button>
  );
}