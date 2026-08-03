"use client";

import { useState, useEffect } from "react";
import type { Dream } from "@/types/dream";
import {
  getDreamsFromDatabase,
  createDreamInDatabase,
  updateDreamInDatabase,
  deleteDreamFromDatabase,
  toggleFavoriteInDatabase,
} from "@/lib/database/dreams";

const defaultDreams: Dream[] = [
  {
    id: "welcome",
    title: "Welcome to SOMNIA",
    dream: "Your saved dreams will appear here.",
    date: new Date().toISOString().split("T")[0],
    favorite: false,
    tags: [],
  },
];

type NewDreamInput = {
  title: string;
  dream: string;
  tags: string[];
};

export function useDreams() {
  const [dreams, setDreams] = useState<Dream[]>(defaultDreams);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadDreams() {
      try {
        const dbDreams = await getDreamsFromDatabase();

        setDreams(dbDreams.length > 0 ? dbDreams : defaultDreams);
      } catch (err) {
        console.error("Failed to load dreams:", err);
        setDreams(defaultDreams);
      } finally {
        setHasLoaded(true);
      }
    }

    loadDreams();
  }, []);

  const addDream = async (input: NewDreamInput): Promise<Dream> => {
    const created = await createDreamInDatabase(input);

    setDreams((prev) => {
      const withoutWelcome = prev.filter((d) => d.id !== "welcome");
      return [created, ...withoutWelcome];
    });

    return created;
  };

  const updateDream = async (
    id: string,
    input: NewDreamInput
  ): Promise<void> => {
    await updateDreamInDatabase(id, input);

    setDreams((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              title: input.title.trim(),
              dream: input.dream.trim(),
              tags: input.tags,
            }
          : d
      )
    );
  };

  const deleteDream = async (id: string): Promise<void> => {
    await deleteDreamFromDatabase(id);

    setDreams((prev) => {
      const updated = prev.filter((d) => d.id !== id);

      return updated.length > 0 ? updated : defaultDreams;
    });
  };

  const toggleFavorite = async (id: string): Promise<void> => {
    const target = dreams.find((d) => d.id === id);

    if (!target) return;

    const nextFavorite = !target.favorite;

    await toggleFavoriteInDatabase(id, nextFavorite);

    setDreams((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              favorite: nextFavorite,
            }
          : d
      )
    );
  };

  const getDreamById = (id: string): Dream | undefined =>
    dreams.find((d) => d.id === id);

  return {
    dreams,
    hasLoaded,
    addDream,
    updateDream,
    deleteDream,
    toggleFavorite,
    getDreamById,
  };
}