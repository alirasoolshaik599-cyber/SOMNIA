"use client";

import { useEffect, useState } from "react";
import {
  getDreamsFromDatabase,
  createDreamInDatabase,
} from "@/lib/database/dreams";
import type { Dream } from "@/types/dream";

export default function TestDbPage() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadDreams() {
    try {
      const data = await getDreamsFromDatabase();
      setDreams(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDreams();
  }, []);

  async function handleCreateTestDream() {
    setSaving(true);

    try {
      await createDreamInDatabase({
        title: "Test Dream",
        dream: "This dream was created from the database test page.",
        tags: ["test"],
      });

      await loadDreams();
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Failed");
    }

    setSaving(false);
  }

  if (loading) {
    return <main className="p-10 text-white">Loading...</main>;
  }

  if (error) {
    return <main className="p-10 text-red-400">{error}</main>;
  }

  return (
    <main className="p-10 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Dreams in Database: {dreams.length}
      </h1>

      <button
        onClick={handleCreateTestDream}
        disabled={saving}
        className="mb-8 rounded bg-blue-600 px-5 py-3"
      >
        {saving ? "Saving..." : "Create Test Dream"}
      </button>

      {dreams.map((dream) => (
        <div
          key={dream.id}
          className="mb-4 rounded border border-white/20 p-4"
        >
          <h2 className="font-bold">{dream.title}</h2>
          <p>{dream.date}</p>
        </div>
      ))}
    </main>
  );
}