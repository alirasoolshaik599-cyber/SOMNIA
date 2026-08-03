import { TextareaHTMLAttributes, forwardRef } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, id, error, className = "", ...rest }, ref) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div>
        <label htmlFor={fieldId} className="mb-3 block text-lg font-medium text-white">
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`h-56 w-full rounded-3xl border bg-black/40 p-6 text-base text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#5B6EFF] sm:h-72 sm:p-8 sm:text-lg ${
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

export default TextArea;