"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

type AddRoutineItemFormProps = {
  onSubmit: (label: string) => void;
  onCancel: () => void;
};

export default function AddRoutineItemForm({ onSubmit, onCancel }: AddRoutineItemFormProps) {
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = () => {
    if (!label.trim()) {
      setError("Give your routine item a name.");
      return;
    }
    onSubmit(label);
    setLabel("");
    setError(undefined);
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-md sm:p-6">
      <TextField
        label="Routine Item"
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
          if (error) setError(undefined);
        }}
        placeholder="e.g. Journal for five minutes"
        error={error}
      />
      <div className="flex flex-wrap gap-3">
        <Button size="md" onClick={handleSubmit}>
          Add Item
        </Button>
        <Button variant="ghost" size="md" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}