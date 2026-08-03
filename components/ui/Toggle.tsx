"use client";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative -m-2 shrink-0 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
    >
      <span
        className={`flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-[#5B6EFF]" : "bg-white/15"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}