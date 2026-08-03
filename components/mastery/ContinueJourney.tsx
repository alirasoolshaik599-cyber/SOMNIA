import PillLink from "@/components/ui/PillLink";

const shortcuts = [
  { href: "/dream/new", label: "Record a Dream" },
  { href: "/awareness/reality-checks", label: "Practice Awareness" },
  { href: "/mastery/dream-control", label: "Review Dream Control" },
  { href: "/sleep", label: "Begin Tonight's Preparation" },
];

export default function ContinueJourney() {
  return (
    <div className="flex flex-wrap gap-3">
      {shortcuts.map((shortcut) => (
        <PillLink key={shortcut.href} href={shortcut.href} variant="ghost">
          {shortcut.label}
        </PillLink>
      ))}
    </div>
  );
}