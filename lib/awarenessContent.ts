import type { AwarenessExercise } from "@/types/awareness";

type DefaultRealityCheckTechnique = {
  label: string;
  description: string;
  whyItWorks: string;
  howTo: string;
};

export const defaultRealityCheckTechniques: DefaultRealityCheckTechnique[] = [
  {
    label: "Finger Counting",
    description: "Count your fingers to check whether your hands look normal.",
    whyItWorks:
      "In dreams, hands and fingers often appear distorted, extra, or missing, because the dreaming brain struggles to render fine detail consistently.",
    howTo:
      "Hold up one hand. Count your fingers slowly, twice. Look closely for the correct number and shape both times.",
  },
  {
    label: "Nose Pinch Breathing Test",
    description: "Pinch your nose shut and try to breathe through it.",
    whyItWorks:
      "In a dream, breathing can continue even with your nose pinched, since the dreaming body isn't bound by the same physical rules as waking life.",
    howTo:
      "Pinch your nostrils closed with your fingers. Try to inhale gently through your nose. If you can still breathe, you may be dreaming.",
  },
  {
    label: "Hand Observation",
    description: "Look closely at your palms and the backs of your hands.",
    whyItWorks:
      "Hands are detailed, familiar objects that dreams frequently render incorrectly, making them a reliable dream-versus-reality marker.",
    howTo:
      "Turn your hands over slowly. Study the lines, texture, and proportions. Ask yourself if anything looks unusual.",
  },
  {
    label: "Digital Clock Check",
    description: "Read a digital clock, look away, then read it again.",
    whyItWorks:
      "Numbers and text are unstable in dreams — digital clocks often show a different or nonsensical time between glances.",
    howTo:
      "Find a clock or phone screen. Read the time. Look away for a few seconds, then read it again and compare.",
  },
  {
    label: "Reading Text Twice",
    description: "Read a piece of text, look away, then read it again.",
    whyItWorks:
      "Written words tend to shift or become unreadable across two readings in a dream, unlike in waking life.",
    howTo:
      "Pick any sign, label, or line of text. Read it fully. Glance away, then read the exact same text again.",
  },
  {
    label: "Mirror Observation",
    description: "Look at your reflection carefully in a mirror.",
    whyItWorks:
      "Reflections are often subtly wrong in dreams — the face may look different, move oddly, or fail to match your movements.",
    howTo:
      "Stand in front of a mirror. Observe your reflection for several seconds. Move slightly and check that it matches you exactly.",
  },
];

export const awarenessExercises: AwarenessExercise[] = [
  {
    id: "observe-surroundings",
    title: "Observe Your Surroundings",
    description:
      "Spend a full minute noticing details around you — objects, light, textures — as if seeing them for the first time.",
    durationLabel: "1 min",
  },
  {
    id: "listen-to-sounds",
    title: "Listen to Every Sound",
    description: "Close your eyes and identify every distinct sound you can hear, near and far.",
    durationLabel: "1 min",
  },
  {
    id: "notice-breathing",
    title: "Notice Your Breathing",
    description: "Bring your attention to each inhale and exhale without trying to change it.",
    durationLabel: "1 min",
  },
  {
    id: "observe-hands",
    title: "Observe Your Hands",
    description:
      "Look closely at your hands, noticing detail you'd normally overlook — the same habit that helps you catch dreams.",
    durationLabel: "30 sec",
  },
  {
    id: "am-i-dreaming",
    title: "Am I Dreaming?",
    description:
      "Pause and sincerely ask yourself whether this moment could be a dream, then look for evidence either way.",
    durationLabel: "30 sec",
  },
  {
    id: "mindful-walking",
    title: "Mindful Walking",
    description:
      "Walk a short distance while paying full attention to each step and the sensation of movement.",
    durationLabel: "2 min",
  },
  {
    id: "notice-colors",
    title: "Notice the Colors Around You",
    description: "Spend a minute identifying every distinct color present in your environment.",
    durationLabel: "1 min",
  },
];