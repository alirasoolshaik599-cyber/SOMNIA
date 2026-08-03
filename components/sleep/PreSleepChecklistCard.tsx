import { memo } from "react";
import CheckToggle from "@/components/ui/CheckToggle";
import type { ChecklistItemView } from "@/types/sleep";

type ChecklistRowProps = {
  item: ChecklistItemView;
  onToggle: (id: string) => void;
};

const ChecklistRow = memo(function ChecklistRow({ item, onToggle }: ChecklistRowProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-md transition-all duration-300 sm:px-6 ${
        item.checked ? "border-[#5B6EFF]/20 bg-[#5B6EFF]/10" : "border-white/10 bg-black/30"
      }`}
    >
      <CheckToggle
        checked={item.checked}
        disabled={!item.isManual}
        onToggle={() => onToggle(item.id)}
        label={
          item.isManual
            ? `Mark "${item.label}" as ${item.checked ? "not done" : "done"}`
            : `${item.label}: ${
                item.checked ? "complete" : "not yet complete"
              } (tracked automatically)`
        }
      />
      <p className={`text-base ${item.checked ? "text-white" : "text-slate-300"}`}>
        {item.label}
      </p>
      {!item.isManual && (
        <span className="ml-auto shrink-0 text-xs text-slate-500">Auto-tracked</span>
      )}
    </div>
  );
});

type PreSleepChecklistCardProps = {
  items: ChecklistItemView[];
  onToggle: (id: string) => void;
};

export default function PreSleepChecklistCard({ items, onToggle }: PreSleepChecklistCardProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ChecklistRow key={item.id} item={item} onToggle={onToggle} />
      ))}
    </div>
  );
}