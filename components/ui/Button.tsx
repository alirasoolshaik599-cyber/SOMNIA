import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#5B6EFF] text-white hover:scale-105 hover:shadow-[0_0_45px_rgba(91,110,255,0.65)]",
  ghost: "border border-white/10 bg-black/30 text-white hover:bg-black/50",
  outline:
    "border border-white/10 bg-black/30 text-slate-300 hover:border-[#5B6EFF]/40 hover:bg-[#5B6EFF]/20 hover:text-[#a9b3ff]",
  danger:
    "border border-white/10 bg-black/30 text-slate-300 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-4 py-2 text-sm",
  md: "min-h-[44px] px-6 py-3 text-base",
  lg: "px-10 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = "primary", size = "lg", className = "", type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none disabled:active:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;