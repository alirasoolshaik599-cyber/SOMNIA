"use client";

import { useState } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type DreamCardProps = {
  id: string;
  title: string;
  dream: string;
  date: string;
  favorite: boolean;
  tags: string[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export default function DreamCard({
  id,
  title,
  dream,
  date,
  favorite,
  tags,
  onDelete,
  onEdit,
  onToggleFavorite,
}: DreamCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Link
        href={`/dream/${id}`}
        className="block rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-[#5B6EFF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(id);
              }}
              aria-label={favorite ? "Unfavorite dream" : "Favorite dream"}
              aria-pressed={favorite}
              className="shrink-0 rounded-full text-2xl leading-none transition-transform duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
            >
              {favorite ? (
                <span className="text-yellow-300">★</span>
              ) : (
                <span className="text-slate-500">☆</span>
              )}
            </button>

            <h2 className="truncate text-2xl font-bold text-white">🌙 {title}</h2>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(id);
              }}
              className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:border-[#5B6EFF]/40 hover:bg-[#5B6EFF]/20 hover:text-[#a9b3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmOpen(true);
              }}
              className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 leading-7 text-slate-300">{dream}</p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-[#5B6EFF]/10 px-3 py-1 text-xs text-[#a9b3ff]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-slate-400">{date}</p>
      </Link>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this dream?"
        description={`"${title}" will be permanently removed from your journal.`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(id);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}