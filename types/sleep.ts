export type RoutineItem = {
  id: string;
  label: string;
  isCustom: boolean;
  order: number;
  createdAt: string;
  doneDates: string[];
};

export type NewRoutineItemInput = {
  label: string;
};

export type SleepSchedule = {
  bedtime: string;
  wakeTime: string;
};

export type DreamIntention = {
  text: string;
  date: string;
  updatedAt: string;
};

export type PreSleepChecklistState = {
  date: string;
  completedItemIds: string[];
};

export type ChecklistItemView = {
  id: string;
  label: string;
  checked: boolean;
  isManual: boolean;
};

export type RelaxationExercise = {
  id: string;
  title: string;
  durationLabel: string;
  description: string;
  steps: string[];
};

export type RelaxationCompletion = {
  exerciseId: string;
  doneDates: string[];
};

export type EveningReflectionEntry = {
  id: string;
  date: string;
  text: string;
  updatedAt: string;
};

export type DreamRecallRating = "Poor" | "Fair" | "Good" | "Excellent";

export type SleepQualityEntry = {
  id: string;
  date: string;
  sleepQuality: number;
  dreamRecall: DreamRecallRating;
  hadLucidDream: boolean;
  note: string;
};

export type NewSleepQualityInput = {
  sleepQuality: number;
  dreamRecall: DreamRecallRating;
  hadLucidDream: boolean;
  note: string;
};