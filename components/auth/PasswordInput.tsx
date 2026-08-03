"use client";

import { useState, InputHTMLAttributes } from "react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function PasswordInput({
  label,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300 transition"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}