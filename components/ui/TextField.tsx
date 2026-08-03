import { InputHTMLAttributes, forwardRef } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, id, error, className = "", ...rest }, ref) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div>
        <label htmlFor={fieldId} className="mb-3 block text-lg font-medium text-white">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`w-full rounded-2xl border bg-black/40 px-6 py-4 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#5B6EFF] ${
            error ? "border-red-400/60" : "border-white/20"
          } ${className}`}
          {...rest}
        />
        {error && (
          <p id={`${fieldId}-error`} className="mt-2 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;