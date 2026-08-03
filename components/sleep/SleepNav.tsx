"use client";

import { usePathname } from "next/navigation";
import PillLink from "@/components/ui/PillLink";

const tabs = [
  { href: "/sleep", label: "Hub" },
  { href: "/sleep/routine", label: "Routine" },
  { href: "/sleep/schedule", label: "Schedule" },
  { href: "/sleep/intention", label: "Incubation" },
  { href: "/sleep/relaxation", label: "Relaxation" },
  { href: "/sleep/reflection", label: "Reflection" },
  { href: "/sleep/checklist", label: "Checklist" },
  { href: "/sleep/quality-log", label: "Quality Log" },
];

export default function SleepNav() {
  const pathname = usePathname();

  return (
    <nav
       className="mt-10 flex gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Sleep sections"
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