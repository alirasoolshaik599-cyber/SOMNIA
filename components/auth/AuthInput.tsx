import { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthInput({
  label,
  ...props
}: AuthInputProps) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
}