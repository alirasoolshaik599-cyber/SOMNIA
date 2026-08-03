export type RealityCheck = {
  id: string;
  label: string;
  description: string;
  whyItWorks: string;
  howTo: string;
  enabled: boolean;
  isCustom: boolean;
  createdAt: string;
  doneDates: string[]; // "YYYY-MM-DD" dates this check was practiced
};

export type NewRealityCheckInput = {
  label: string;
  description: string;
};

export type DailyAwarenessEntry = {
  id: string;
  date: string; // "YYYY-MM-DD" — one entry per calendar day
  awarenessRating: number; // 1-5
  note: string;
};

export type NewDailyAwarenessInput = {
  awarenessRating: number;
  note: string;
};

export type AwarenessExercise = {
  id: string;
  title: string;
  description: string;
  durationLabel: string;
};

export type ExerciseCompletion = {
  exerciseId: string;
  doneDates: string[];
};