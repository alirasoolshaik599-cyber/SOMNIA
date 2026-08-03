import type { RelaxationExercise } from "@/types/sleep";

export const relaxationExercises: RelaxationExercise[] = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    durationLabel: "4 min",
    description: "A steady four-part breathing pattern that calms the nervous system.",
    steps: [
      "Inhale slowly through your nose for 4 counts.",
      "Hold your breath for 4 counts.",
      "Exhale slowly through your mouth for 4 counts.",
      "Hold at the bottom for 4 counts.",
      "Repeat the cycle for several rounds.",
    ],
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    durationLabel: "3 min",
    description: "A calming breath pattern often used to ease into sleep.",
    steps: [
      "Inhale quietly through your nose for 4 counts.",
      "Hold your breath for 7 counts.",
      "Exhale completely through your mouth for 8 counts.",
      "Repeat the full cycle 4 times.",
    ],
  },
  {
    id: "body-scan",
    title: "Body Scan",
    durationLabel: "5 min",
    description: "Slowly bring attention through the body, releasing tension as you go.",
    steps: [
      "Lie down comfortably and close your eyes.",
      "Bring attention to your feet, noticing any tension.",
      "Slowly move your attention upward through each part of your body.",
      "Let each area soften as you pass over it.",
      "Finish by noticing your body as a whole.",
    ],
  },
  {
    id: "progressive-muscle-relaxation",
    title: "Progressive Muscle Relaxation",
    durationLabel: "6 min",
    description: "Tense and release each muscle group to encourage deep physical relaxation.",
    steps: [
      "Starting with your feet, tense the muscles tightly for 5 seconds.",
      "Release and notice the relaxation that follows.",
      "Move upward through your legs, torso, arms, and face.",
      "Tense and release each muscle group in turn.",
      "Finish with your whole body relaxed.",
    ],
  },
  {
    id: "mindful-observation",
    title: "Mindful Observation",
    durationLabel: "3 min",
    description: "A gentle focusing exercise using a single nearby object.",
    steps: [
      "Pick one object nearby.",
      "Observe its shape, color, and texture without judgment.",
      "Notice details you'd normally overlook.",
      "Let your attention rest gently on the object.",
      "Return your focus if your mind wanders.",
    ],
  },
];