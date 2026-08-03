import type { GuidedSessionStepContent } from "@/types/induction";

export const wbtbOverview = {
  whatItIs:
    "Wake Back To Bed involves waking briefly after several hours of sleep, staying up a short while, then returning to sleep with a clear intention.",
  whyItWorks:
    "Waking during a REM-heavy stretch of the night and returning to sleep shortly after tends to increase both dream vividness and lucidity odds, since you carry a moment of waking awareness directly back into the next dream.",
  whenToPractice:
    "On a night you can afford a brief, planned interruption to sleep — ideally not before a day that requires you to be well-rested.",
  bestFor:
    "People comfortable with an occasional disrupted night, and especially well paired with MILD during the return-to-bed step.",
};

export const wbtbPreparationTips: string[] = [
  "Choose a night when you can afford a slightly disrupted sleep, ideally without early obligations the next day.",
  "Plan to sleep for about 4.5-6 hours before waking — this timing lines up with a natural REM-heavy stretch of sleep.",
  "Set a gentle alarm for that point in the night, and place it somewhere you'll actually get up to silence it.",
  "When you wake, keep the lights low and your mind calm — this isn't a full wake-up, just a brief, quiet pause.",
];

export const wbtbSteps: GuidedSessionStepContent[] = [
  {
    id: "sleep-normally",
    title: "Sleep Normally",
    purpose: "Let your first sleep cycle happen naturally.",
    guidance:
      "Go to sleep as you normally would. Your alarm will handle the timing — there's nothing to do differently here.",
  },
  {
    id: "wake-after-hours",
    title: "Wake After Several Hours",
    purpose: "Reach the REM-heavy window WBTB relies on.",
    guidance:
      "When your alarm goes off, sit up and get out of bed briefly, even if you feel groggy. A few minutes upright helps the technique work.",
  },
  {
    id: "stay-awake-briefly",
    title: "Stay Awake Briefly",
    purpose: "Give your mind a short, calm window of wakefulness.",
    guidance:
      "Stay awake somewhere between a few minutes and half an hour. Keep it low-key — dim light, quiet, nothing stimulating.",
  },
  {
    id: "remain-alert",
    title: "Remain Mentally Alert",
    purpose: "Use this window with intention, not distraction.",
    guidance:
      "While you're up, think about lucid dreaming — reflect on a recent dream, or simply remind yourself that you intend to recognize a dream tonight.",
  },
  {
    id: "return-with-intention",
    title: "Return to Bed With Intention",
    purpose: "Carry your intention back into sleep.",
    guidance:
      "Lie back down and set a clear, calm intention to notice when you're dreaming — the same sincere intention MILD uses.",
  },
  {
    id: "fall-asleep-calmly",
    title: "Fall Asleep Calmly",
    purpose: "Let sleep happen without forcing it.",
    guidance:
      "Relax and let yourself drift off naturally. Don't strain to stay aware — trust the intention you just set.",
  },
];

export const wbtbTips: string[] = [
  "Keep the awake period calm — dim lights and quiet surroundings work far better than anything stimulating.",
  "Go back to sleep calmly rather than anxiously trying to force yourself back to sleep faster.",
  "Don't stay awake too long — a brief window is enough, and staying up too long just leaves you tired.",
  "Pair WBTB with MILD during the 'return to bed' step for a stronger combined effect.",
];

export const wbtbCommonMistakes: string[] = [
  "Staying awake too long — turning the brief pause into a long wake period makes it harder to fall back asleep.",
  "Checking your phone or anything stimulating — bright screens and engaging content work against the calm state WBTB needs.",
  "Becoming frustrated if it doesn't work right away — this is a skill like any other, and it's completely normal to need practice.",
  "Doing it every single night — WBTB disrupts sleep, so using it occasionally tends to work better than constant use.",
];