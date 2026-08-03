"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDreams } from "@/hooks/useDreams";
import PageBackground from "@/components/layout/PageBackground";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DreamInsights from "@/components/dream/DreamInsights";

export default function DreamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { hasLoaded, getDreamById, deleteDream } = useDreams();
  const dream = hasLoaded ? getDreamById(id) : undefined;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setConfirmOpen(false);

    await deleteDream(id);

    router.push("/journal");
  };

  const handleEdit = () => {
    router.push(`/dream/new?edit=${id}`);
  };

  if (!hasLoaded) {
    return (
      <main className="relative min-h-dvh px-4 py-16 sm:px-6 sm:py-20">
        <PageBackground />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <p className="text-center text-slate-300">Loading...</p>
        </div>
      </main>
    );
  }

  if (!dream) {
    return (
      <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <PageBackground />

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <PageNav left={<PillLink href="/journal">← Back</PillLink>} />

          <div className="mt-16 flex min-h-[50vh] flex-col items-center justify-center text-center sm:mt-20">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              🌙 Dream not found
            </h1>
            <p className="mt-4 text-slate-300">
              This dream may have been deleted or never existed.
            </p>
            <PillLink href="/journal" variant="primary" className="mt-8">
              Return to Dream Journal
            </PillLink>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <PageBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

        <div className="mt-10 sm:mt-14">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 text-3xl leading-none">
                  {dream.favorite ? (
                    <span className="text-yellow-300">★</span>
                  ) : (
                    <span className="text-slate-500">☆</span>
                  )}
                </span>

                <h1 className="break-words text-2xl font-bold text-white sm:text-4xl">
                  🌙 {dream.title}
                </h1>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setConfirmOpen(true)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <p className="mt-8 whitespace-pre-wrap text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {dream.dream}
            </p>

            {dream.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {dream.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-[#5B6EFF]/10 px-3 py-1 text-xs text-[#a9b3ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-8 text-sm text-slate-400">{dream.date}</p>
          </div>

          <DreamInsights />
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this dream?"
        description={`"${dream.title}" will be permanently removed from your journal.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </main>
  );
}