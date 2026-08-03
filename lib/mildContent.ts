export const mildOverview = {
  whatItIs:
    "MILD pairs a short memory phrase with a clear intention, practiced right as you fall asleep, so your mind carries that intention into the dream itself.",
  whyItWorks:
    "It relies on prospective memory — the same mental skill that lets you remember to do something later. Rehearsing the intention just before sleep makes it far more likely to resurface once you're dreaming.",
  whenToPractice:
    "Right before sleep, and ideally again if you wake briefly during the night and are drifting back off.",
  bestFor:
    "Anyone starting out with induction, especially if you already have some dream recall to draw dream signs from.",
};

export type MildStep = {
  id: string;
  title: string;
  explanation: string;
  guidance: string;
  whyItMatters: string;
};

export const mildSteps: MildStep[] = [
  {
    id: "introduction",
    title: "Introduction",
    explanation: "Get comfortable with the idea before you begin.",
    guidance:
      "MILD is practiced lying in bed, in the last few minutes before you fall asleep. You don't need anything special — just a quiet moment and a clear mind.",
    whyItMatters:
      "Approaching it calmly, without pressure, keeps the technique from feeling like a chore — which matters more than people expect.",
  },
  {
    id: "preparation",
    title: "Preparation",
    explanation: "Settle your body and mind before starting.",
    guidance:
      "Lie down in your normal sleep position. Let your body relax. Take a few slow breaths and let the day's thoughts settle.",
    whyItMatters:
      "A relaxed state makes it easier to hold a single intention clearly, rather than getting pulled into unrelated thoughts.",
  },
  {
    id: "recall-last-dream",
    title: "Recall Your Last Dream",
    explanation: "Bring a recent dream to mind, even a fragment.",
    guidance:
      "Think back to your most recent dream — or check your Dream Journal if it helps. Picture it as vividly as you can.",
    whyItMatters:
      "This warms up the same mental process you'll use to imagine tonight's dream in a few steps.",
  },
  {
    id: "identify-dream-signs",
    title: "Identify Dream Signs",
    explanation: "Notice what marked that dream as unusual.",
    guidance:
      "Ask yourself what was strange, impossible, or inconsistent in that dream — a dream sign is anything that, if you noticed it, could have tipped you off that you were dreaming.",
    whyItMatters:
      "Recognizing dream signs is often the exact moment lucidity happens — this step trains you to look for them.",
  },
  {
    id: "create-intention",
    title: "Create Your Intention",
    explanation: "Form a clear, simple intention for tonight.",
    guidance:
      "Decide, sincerely, that the next time you're dreaming, you'll recognize it. This isn't a wish — it's a genuine intention you're setting for yourself.",
    whyItMatters:
      "A vague hope rarely carries into a dream. A specific, sincere intention is what prospective memory responds to.",
  },
  {
    id: "repeat-phrase",
    title: "Repeat Your Chosen Phrase",
    explanation: "Silently repeat your MILD phrase a few times.",
    guidance:
      "Say your phrase to yourself slowly, meaning it each time, rather than rushing through it as a formality.",
    whyItMatters:
      "Repeating it mechanically is the single most common reason MILD doesn't work — meaning it each time is what makes it stick.",
  },
  {
    id: "visualize-lucid",
    title: "Visualize Becoming Lucid",
    explanation: "Picture yourself noticing a dream sign and realizing you're dreaming.",
    guidance:
      "Imagine yourself back in that recent dream, noticing the dream sign you identified earlier, and realizing in that moment: 'I'm dreaming.'",
    whyItMatters:
      "Rehearsing the realization itself — not just the phrase — gives your mind a specific moment to recognize later.",
  },
  {
    id: "go-to-sleep",
    title: "Go to Sleep",
    explanation: "Let go and allow yourself to drift off naturally.",
    guidance:
      "Once you've repeated your phrase and visualized becoming lucid a few times, stop actively trying and simply let yourself fall asleep.",
    whyItMatters:
      "Forcing the process past this point tends to keep you awake — trust the intention you've just set and let sleep happen.",
  },
];

export const mildPhrasePresets: string[] = [
  "Next time I'm dreaming, I'll realize I'm dreaming.",
  "I will notice when I am dreaming.",
  "Tonight, I recognize that I'm dreaming.",
];

export const mildCommonMistakes: string[] = [
  "Repeating the phrase mechanically — it works far better when you actually mean it each time, even if that means repeating it fewer times.",
  "Skipping the visualization step — picturing yourself becoming lucid is at least as important as the phrase itself.",
  "Practicing inconsistently — a few relaxed minutes most nights builds the habit far more than one intense session.",
  "Expecting instant success — it's completely normal for this to take practice. Every attempt still builds the underlying skill.",
];

export const mildTips: string[] = [
  "Practice consistently, even briefly — a short, calm attempt most nights beats an occasional long one.",
  "Keep using Dream Recall regularly — the more dreams you remember, the more dream signs you'll have to work with.",
  "Stay patient with yourself — this is a skill, and skills take repetition.",
  "Review your recent dreams before practicing — it makes Step 3 and Step 4 easier and more specific.",
];

import type { GuidedSessionStepContent } from "@/types/induction";

export const guidedSessionSteps: GuidedSessionStepContent[] = [
  {
    id: "welcome",
    title: "Welcome",
    purpose: "A calm moment before you begin.",
    guidance:
      "This short guided session walks you through MILD, one step at a time. There's no rush — take as long as you need on each step.",
  },
  {
    id: "recall",
    title: "Recall Your Most Recent Dream",
    purpose: "Warm up your dream memory.",
    guidance:
      "Bring your most recent dream to mind — even a fragment is enough. If it helps, picture where you were and what was happening.",
  },
  {
    id: "dream-sign",
    title: "Identify a Dream Sign",
    purpose: "Find something in that dream you could recognize next time.",
    guidance:
      "Think of one thing in that dream that was strange, impossible, or inconsistent — something that, if you noticed it, could tip you off that you're dreaming.",
  },
  {
    id: "phrase",
    title: "Your MILD Phrase",
    purpose: "Bring your intention into focus.",
    guidance:
      "Here's the phrase you've chosen. In the next step, you'll repeat it silently, meaning it each time.",
  },
  {
    id: "repeat",
    title: "Repeat Your Phrase",
    purpose: "Set your intention for tonight.",
    guidance:
      "Silently repeat your phrase a few times, meaning it each time rather than rushing through it. Let it settle rather than forcing it.",
  },
  {
    id: "visualize",
    title: "Visualize Becoming Lucid",
    purpose: "Rehearse the moment of realization.",
    guidance:
      "Imagine yourself back in that recent dream, noticing the dream sign you identified, and realizing in that moment: 'I'm dreaming.'",
  },
];