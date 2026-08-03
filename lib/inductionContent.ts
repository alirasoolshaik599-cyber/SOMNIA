export type InductionDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type PatienceLevel = "Low" | "Moderate" | "High";
export type TechniqueTrainingStatus = "guided" | "overview";

export type InductionTechnique = {
  id: string;
  name: string;
  fullName: string;
  difficulty: InductionDifficulty;
  description: string;
  practiceTime: string;
  bestFor: string;
  detailPoints?: string[];
  learnMoreHref?: string;
  learnMoreLabel?: string;
  trainingStatus: TechniqueTrainingStatus;
  requiresWakingAtNight: boolean;
  visualizationRequired: boolean;
  bestTimeToPractice: string;
  patienceRequired: PatienceLevel;
  beginnerFriendly: boolean;
  chooseIfDescription: string;
};

export const inductionTechniques: InductionTechnique[] = [
  {
    id: "mild",
    name: "MILD",
    fullName: "Mnemonic Induction of Lucid Dreams",
    difficulty: "Beginner",
    description:
      "Uses a simple intention and memory cue, repeated as you fall asleep, to prompt lucidity the next time you find yourself dreaming.",
    practiceTime: "5-10 minutes, right before sleep",
    bestFor: "Beginners, and anyone who already has some dream recall.",
    detailPoints: [
      "SOMNIA's first fully guided technique, with a step-by-step flow.",
      "Includes a personal phrase you choose and can reuse every night.",
      "Comes with a lightweight nightly practice log.",
    ],
    learnMoreHref: "/induction/mild",
    learnMoreLabel: "Start Guided MILD Training",
    trainingStatus: "guided",
    requiresWakingAtNight: false,
    visualizationRequired: true,
    bestTimeToPractice: "Right before sleep",
    patienceRequired: "Moderate",
    beginnerFriendly: true,
    chooseIfDescription: "You're new to lucid dreaming and want a gentle, no-disruption start.",
  },
  {
    id: "wbtb",
    name: "WBTB",
    fullName: "Wake Back To Bed",
    difficulty: "Intermediate",
    description:
      "Involves waking briefly after several hours of sleep, staying awake a short while, then returning to sleep — a window known to increase lucidity odds.",
    practiceTime: "20-60 minutes awake, in the middle of the night",
    bestFor: "People comfortable disrupting their sleep schedule occasionally.",
    detailPoints: [
      "SOMNIA's second fully guided technique, with a step-by-step flow.",
      "Pairs well with MILD during the return-to-bed step.",
      "Comes with its own lightweight nightly practice log.",
    ],
    learnMoreHref: "/induction/wbtb",
    learnMoreLabel: "Start Guided WBTB Training",
    trainingStatus: "guided",
    requiresWakingAtNight: true,
    visualizationRequired: false,
    bestTimeToPractice: "4.5-6 hours into sleep",
    patienceRequired: "Moderate",
    beginnerFriendly: false,
    chooseIfDescription: "You're comfortable waking during the night for a brief, planned pause.",
  },
  {
    id: "wild",
    name: "WILD",
    fullName: "Wake Initiated Lucid Dream",
    difficulty: "Advanced",
    description:
      "Aims to keep the mind awake while the body falls asleep, transitioning directly into a dream with full awareness intact.",
    practiceTime: "15-40 minutes of focused relaxation",
    bestFor: "Experienced practitioners comfortable with sleep paralysis sensations.",
    detailPoints: [
      "SOMNIA's third fully guided technique, paced slower and more meditatively than MILD or WBTB.",
      "Focuses on calm, sustained awareness rather than memory or timing.",
      "Comes with its own lightweight nightly practice log.",
    ],
    learnMoreHref: "/induction/wild",
    learnMoreLabel: "Start Guided WILD Training",
    trainingStatus: "guided",
    requiresWakingAtNight: false,
    visualizationRequired: true,
    bestTimeToPractice: "During a nap, or after a brief WBTB wake-up",
    patienceRequired: "High",
    beginnerFriendly: false,
    chooseIfDescription: "You prefer slow, meditation-like practice and don't mind lying still.",
  },
  {
    id: "ssild",
    name: "SSILD",
    fullName: "Senses Initiated Lucid Dream",
    difficulty: "Intermediate",
    description:
      "Cycles attention gently through sight, hearing, and touch to heighten sensory awareness just before sleep.",
    practiceTime: "10-15 minutes, before or during WBTB",
    bestFor: "People who find visualization-heavy techniques difficult.",
    trainingStatus: "overview",
    requiresWakingAtNight: false,
    visualizationRequired: false,
    bestTimeToPractice: "Before sleep, or during a WBTB wake-up",
    patienceRequired: "Low",
    beginnerFriendly: true,
    chooseIfDescription:
      "You find visualization difficult and prefer a sensory, less imagination-heavy method.",
  },
  {
    id: "fild",
    name: "FILD",
    fullName: "Finger Induced Lucid Dream",
    difficulty: "Beginner",
    description:
      "Uses small, repeated finger movements upon waking to maintain body awareness while quickly drifting back into a dream.",
    practiceTime: "1-2 minutes, immediately after waking briefly",
    bestFor: "Light sleepers and those who naturally wake several times a night.",
    trainingStatus: "overview",
    requiresWakingAtNight: true,
    visualizationRequired: false,
    bestTimeToPractice: "Immediately after briefly waking",
    patienceRequired: "Low",
    beginnerFriendly: true,
    chooseIfDescription: "You already wake briefly during the night and want something quick.",
  },
];

export const inductionIntro = {
  whatIsIt:
    "Lucid dream induction is the practice of deliberately increasing your chances of becoming aware that you're dreaming, while the dream is still happening.",
  whyPreparationMatters:
    "Induction techniques work best on a foundation of strong dream recall, daytime awareness, and consistent sleep — without that groundwork, even a well-timed technique has little to work with.",
  whyThisOrder:
    "That's why Dream Recall, Awareness, and Sleep Preparation came first. Each one builds a skill induction techniques depend on: remembering dreams, noticing dream signs, and falling asleep in a state ready for lucidity.",
};

export const beginnerRecommendation = {
  techniqueId: "mild",
  reason:
    "MILD is gentle, requires no unusual sleep schedule, and directly builds on the dream recall and intention-setting habits you've already been practicing in SOMNIA.",
};