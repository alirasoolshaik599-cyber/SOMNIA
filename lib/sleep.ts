import type { ChecklistItemView } from "@/types/sleep";

export const defaultRoutineLabels: string[] = [
  "Brush Teeth",
  "Reduce Screen Time",
  "Read a Book",
  "Meditation",
  "Stretching",
  "Prepare Bedroom",
  "Drink Water",
  "Review Dream Journal",
];

export const defaultIntentionPresets: string[] = [
  "Flying",
  "Exploring Space",
  "Visiting Childhood",
  "Ocean Adventure",
  "Meet Someone",
  "Creative Inspiration",
  "Solve a Problem",
];

export const dreamIncubationExplanation = {
  whatItIs:
    "Dream incubation is the practice of choosing a specific theme or question before sleep, so your mind has something to focus on as you dream.",
  whyItWorks:
    "A clear intention gives your dreaming mind a thread to follow. It won't guarantee the exact dream, but it measurably increases how often that theme — or a lucid moment noticing it — shows up.",
  howTo:
    "Pick one intention below, or write your own. Hold it gently in mind as you fall asleep tonight, repeating it a few times without forcing it.",
};

export const manualChecklistItems: { id: string; label: string }[] = [
  { id: "room-dark", label: "Room is dark" },
  { id: "phone-away", label: "Phone put away" },
  { id: "calm-mindset", label: "Calm mindset" },
];

export const reflectionPrompts: string[] = [
  "How did today feel?",
  "Were you mindful today?",
  "Did anything unusual happen?",
  "What emotion stayed with you?",
  "Did you notice recurring thoughts?",
];

export const dreamRecallOptions: { value: string; label: string }[] = [
  { value: "Poor", label: "Poor" },
  { value: "Fair", label: "Fair" },
  { value: "Good", label: "Good" },
  { value: "Excellent", label: "Excellent" },
];

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function computeSleepDurationMinutes(bedtime: string, wakeTime: string): number {
  const bed = parseTimeToMinutes(bedtime);
  const wake = parseTimeToMinutes(wakeTime);
  const diff = wake - bed;
  return diff > 0 ? diff : diff + 24 * 60;
}

export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

export function formatTimeLabel(time: string): string {
  const [hStr, mStr] = time.split(":");
  const hour = Number(hStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${mStr} ${period}`;
}

export type ReadinessState = { emoji: string; label: string };

export function computeReadinessState(completedAreas: number, totalAreas: number): ReadinessState {
  if (completedAreas <= 0) return { emoji: "🌑", label: "Not Started" };
  if (completedAreas >= totalAreas) return { emoji: "🌕", label: "Ready for Sleep" };
  if (completedAreas >= totalAreas - 1) return { emoji: "🌗", label: "Almost Ready" };
  return { emoji: "🌘", label: "Preparing" };
}

// Shared by the Checklist page and the Readiness Dashboard so the "what counts
// as complete" logic lives in exactly one place.
export function buildPreSleepChecklistItems(
  completedItemIds: string[],
  realityChecksDoneToday: boolean,
  intentionSetToday: boolean
): ChecklistItemView[] {
  return [
    ...manualChecklistItems.map((item) => ({
      id: item.id,
      label: item.label,
      checked: completedItemIds.includes(item.id),
      isManual: true,
    })),
    {
      id: "reality-checks-done",
      label: "Reality checks completed today",
      checked: realityChecksDoneToday,
      isManual: false,
    },
    {
      id: "intention-set",
      label: "Dream intention set",
      checked: intentionSetToday,
      isManual: false,
    },
  ];
}