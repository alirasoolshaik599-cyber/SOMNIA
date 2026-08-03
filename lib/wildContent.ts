import type { GuidedSessionStepContent } from "@/types/induction";

export const wildOverview = {
  whatItIs:
    "Wake Initiated Lucid Dreaming means staying gently aware as your body falls asleep, so you slip directly into a dream while still conscious of the transition.",
  whyItWorks:
    "Sleep onset naturally involves a brief window where the body relaxes into sleep while the mind can, with practice, stay lightly present. Staying with that window — rather than losing awareness — is what allows the dream to begin with lucidity already intact.",
  whenToPractice:
    "Best attempted when you're relaxed but not overtired — often during a daytime nap or after a brief WBTB wake-up, when falling back asleep tends to happen more slowly.",
  bestFor:
    "Practitioners who are comfortable lying still for a while and who don't mind sitting with unusual sensations as sleep approaches.",
};

export const wildPreparationTopics = [
  {
    label: "Mental relaxation",
    text: "Let your thoughts slow down naturally rather than trying to empty your mind. A wandering thought is fine — just don't chase it.",
  },
  {
    label: "Physical comfort",
    text: "Find a position you can hold without needing to move — WILD depends on staying physically still as your body drifts toward sleep.",
  },
  {
    label: "Remaining calm",
    text: "You may notice unusual sensations as you approach sleep — tingling, heaviness, or drifting imagery. These are normal; staying calm through them is what allows the process to continue.",
  },
  {
    label: "Expectations",
    text: "WILD tends to take longer to learn than other techniques. A calm, patient attempt — even one that doesn't lead to a lucid dream — is still valuable practice.",
  },
];

export const wildSteps: GuidedSessionStepContent[] = [
  {
    id: "relax",
    title: "Relax Comfortably",
    purpose: "Settle into stillness before anything else.",
    guidance:
      "Lie down in a comfortable position you can hold without moving. Let your body go heavy and soft, from your feet up to your face.",
  },
  {
    id: "observe-breathing",
    title: "Observe Your Breathing",
    purpose: "Give your mind something gentle to rest on.",
    guidance:
      "Bring your attention to your breath, without changing it. Simply notice each inhale and exhale as it happens.",
  },
  {
    id: "allow-thoughts",
    title: "Allow Thoughts to Come and Go",
    purpose: "Stay present without fighting your mind.",
    guidance:
      "Thoughts will drift through — that's normal. Let each one pass without following it, gently returning your attention to stillness.",
  },
  {
    id: "notice-imagery",
    title: "Notice Early Dream Imagery",
    purpose: "Stay lightly aware as hypnagogic imagery appears.",
    guidance:
      "You may start to notice faint shapes, colors, or scenes forming behind your closed eyes. Simply observe them, without trying to hold on or push them away.",
  },
  {
    id: "maintain-awareness",
    title: "Maintain Gentle Awareness",
    purpose: "Stay softly present as sleep approaches.",
    guidance:
      "Keep a light thread of awareness as everything grows more vivid. Avoid straining to stay awake — a gentle, relaxed attention is enough.",
  },
  {
    id: "allow-develop",
    title: "Allow the Dream to Develop",
    purpose: "Let the scene form fully around you.",
    guidance:
      "As imagery becomes a full scene, let yourself settle into it rather than analyzing it. Once you feel present in the dream, you can gently confirm to yourself that you're dreaming.",
  },
];

export const wildTips: string[] = [
  "Stay relaxed throughout — tension anywhere in the body tends to pull you back to full wakefulness.",
  "Be patient with the process — WILD often takes more attempts to learn than other techniques.",
  "Avoid forcing awareness — a light, calm attention works better than straining to stay alert.",
  "Practice consistently, in short, unhurried sessions, rather than one long forced attempt.",
];

export const wildCommonMistakes: string[] = [
  "Trying too hard — gripping tightly onto wakefulness tends to prevent sleep from beginning at all.",
  "Becoming excited when imagery appears — a rush of excitement is enough to pull you fully awake.",
  "Moving unnecessarily — even small movements can reset the process and send you back to the beginning.",
  "Expecting immediate success — this is completely normal. Each calm attempt still builds the skill.",
];