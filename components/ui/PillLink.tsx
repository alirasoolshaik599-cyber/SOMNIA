import Link from "next/link";
import type { ComponentProps } from "react";

type PillLinkProps = ComponentProps<typeof Link> & {
  variant?: "ghost" | "primary";
};

const variantClasses: Record<"ghost" | "primary", string> = {
  ghost: "border border-white/10 bg-black/30 hover:bg-black/50",
  primary:
    "bg-[#5B6EFF] hover:scale-105 hover:shadow-[0_0_45px_rgba(91,110,255,0.65)]",
};

export default function PillLink({
  variant = "ghost",
  className = "",
  children,
  ...rest
}: PillLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}