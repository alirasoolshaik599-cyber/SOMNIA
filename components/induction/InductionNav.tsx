"use client";

import { usePathname } from "next/navigation";
import PillLink from "@/components/ui/PillLink";

const tabs = [
  { href: "/induction", label: "Overview" },
  { href: "/induction/techniques", label: "Techniques" },
  { href: "/induction/compare", label: "Compare" },
  { href: "/induction/mild", label: "MILD" },
  { href: "/induction/wbtb", label: "WBTB" },
  { href: "/induction/wild", label: "WILD" },
];

export default function InductionNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mt-10 flex gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Induction sections"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <PillLink
            key={tab.href}
            href={tab.href}
            variant={isActive ? "primary" : "ghost"}
            aria-current={isActive ? "page" : undefined}
            className="flex min-h-[44px] shrink-0 items-center px-5 text-sm"
          >
            {tab.label}
          </PillLink>
        );
      })}
    </nav>
  );
}