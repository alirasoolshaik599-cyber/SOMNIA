import DreamCard from "./DreamCard";
import type { Dream } from "@/types/dream";

type DreamJournalProps = {
  dreams: Dream[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  emptyMessage?: string;
};

export default function DreamJournal({
  dreams,
  onDelete,
  onEdit,
  onToggleFavorite,
  emptyMessage = "No dreams saved yet.",
}: DreamJournalProps) {
  return (
    <div className="mt-16">
      {dreams.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-black/25 px-8 py-16 text-center backdrop-blur-md">
          <span className="text-4xl">🌙</span>
          <p className="mt-4 text-slate-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {dreams.map((dream) => (
            <DreamCard
              key={dream.id}
              id={dream.id}
              title={dream.title}
              dream={dream.dream}
              date={dream.date}
              favorite={dream.favorite}
              tags={dream.tags}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}