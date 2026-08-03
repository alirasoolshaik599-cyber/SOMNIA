"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

type RealityCheckFormProps = {
  initialLabel?: string;
  initialDescription?: string;
  submitLabel: string;
  onSubmit: (input: { label: string; description: string }) => void;
  onCancel?: () => void;
};

export default function RealityCheckForm({
  initialLabel = "",
  initialDescription = "",
  submitLabel,
  onSubmit,
  onCancel,
}: RealityCheckFormProps) {
  const [label, setLabel] = useState(initialLabel);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setLabel(initialLabel);
    setDescription(initialDescription);
  }, [initialLabel, initialDescription]);

  const handleSubmit = () => {
    if (!label.trim()) {
      setError("Give your reality check a name.");
      return;
    }
    setError(undefined);
    onSubmit({ label, description });
    if (!onCancel) {
      setLabel("");
      setDescription("");
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-md sm:p-6">
      <TextField
        label="Reality Check"
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
          if (error) setError(undefined);
        }}
        placeholder="e.g. Look at your hands"
        error={error}
      />

      <TextField
        label="Short Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What does this check involve?"
      />

      <div className="flex flex-wrap gap-3">
        <Button size="md" onClick={handleSubmit}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}