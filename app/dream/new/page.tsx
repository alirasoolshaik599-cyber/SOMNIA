"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDreams } from "@/hooks/useDreams";
import { useAuthContext } from "@/components/providers/AuthProvider";
import AuthRequiredModal from "@/components/auth/AuthRequiredModal";
import PageBackground from "@/components/layout/PageBackground";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PillLink from "@/components/ui/PillLink";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import TagInput from "@/components/dream/TagInput";

function NewDreamPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { hasLoaded, addDream, updateDream, getDreamById } = useDreams();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [dream, setDream] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [editingDreamId, setEditingDreamId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    dream?: string;
  }>({});

  const isSavingRef = useRef(false);
  const appliedEditParamRef = useRef(false);

  useEffect(() => {
    if (!hasLoaded || appliedEditParamRef.current) return;

    const editId = searchParams.get("edit");

    if (!editId) {
      appliedEditParamRef.current = true;
      return;
    }

    const target = getDreamById(editId);

    if (target) {
      setTitle(target.title);
      setDream(target.dream);
      setCurrentTags(target.tags);
      setEditingDreamId(target.id);
    }

    appliedEditParamRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoaded, searchParams]);

  const handleSave = async () => {
    if (isSavingRef.current) return;

    const nextErrors: {
      title?: string;
      dream?: string;
    } = {};

    if (!title.trim()) {
      nextErrors.title = "Give your dream a title.";
    }

    if (!dream.trim()) {
      nextErrors.dream = "Write down what you remember.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setErrors({});
    isSavingRef.current = true;

    if (editingDreamId) {
      await updateDream(editingDreamId, {
        title,
        dream,
        tags: currentTags,
      });

      router.push(`/dream/${editingDreamId}`);
      return;
    }

    const created = await addDream({
      title,
      dream,
      tags: currentTags,
    });

    router.push(`/dream/${created.id}`);
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

  return (
    <>
      <main className="relative min-h-dvh px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <PageBackground />

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <PageNav left={<PillLink href="/journal">← Journal</PillLink>} />

          <div className="mt-10 sm:mt-14">
            <PageHeader
              title={editingDreamId ? "Update your dream" : "Take a moment..."}
              description={
                editingDreamId
                  ? "Refine what you remember."
                  : "What is the first thing you remember?"
              }
            />

            <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
              <TextField
                label="Dream Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);

                  if (errors.title) {
                    setErrors((prev) => ({
                      ...prev,
                      title: undefined,
                    }));
                  }
                }}
                placeholder="Give your dream a name..."
                error={errors.title}
                maxLength={120}
              />

              <TextArea
                label="Dream"
                value={dream}
                onChange={(e) => {
                  setDream(e.target.value);

                  if (errors.dream) {
                    setErrors((prev) => ({
                      ...prev,
                      dream: undefined,
                    }));
                  }
                }}
                placeholder="Start writing your dream..."
                error={errors.dream}
              />

              <TagInput
                tags={currentTags}
                onChange={setCurrentTags}
              />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button onClick={handleSave}>
                {editingDreamId
                  ? "Update Dream"
                  : "Save to Dream Journal"}
              </Button>

              {editingDreamId && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() =>
                    router.push(`/dream/${editingDreamId}`)
                  }
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <AuthRequiredModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default function NewDreamPage() {
  return (
    <Suspense fallback={null}>
      <NewDreamPageContent />
    </Suspense>
  );
}