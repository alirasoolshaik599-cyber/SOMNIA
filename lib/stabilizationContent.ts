import type { GuidedSessionStepContent } from "@/types/induction";

export const stabilizationIntro = {
  whatItIs:
    "Stabilization is what you do in the moments right after becoming lucid, to help the dream stay vivid and coherent instead of fading quickly.",
  whyItMatters:
    "Many lucid dreamers report their first lucid moments are brief — stabilization techniques are simply a set of commonly reported ways to extend that window.",
};

export const whyDreamsEndReasons: string[] = [
  "A rush of excitement — the surprise of realizing you're dreaming can be enough to wake you up.",
  "Losing focus — if attention drifts entirely away from the dream, some people find it starts to dissolve.",
  "Natural waking — a lucid dream can simply end where any dream would, especially near the end of a sleep cycle.",
  "Overthinking it — analyzing the dream too intensely in the moment can sometimes pull you out of it.",
];

export type StabilizationTechnique = {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  howTo: string;
};

export const stabilizationTechniques: StabilizationTechnique[] = [
  {
    id: "remain-calm",
    title: "Remain Calm",
    description: "Meet the moment of realization with steadiness rather than a rush of excitement.",
    whyItMatters:
      "A sudden spike of excitement is one of the most commonly reported reasons a lucid dream ends quickly.",
    howTo:
      "When you realize you're dreaming, take a mental breath. Remind yourself there's no need to rush — you can explore calmly.",
  },
  {
    id: "engage-senses",
    title: "Engage the Senses",
    description: "Bring your attention to what you can see, hear, or feel in the dream.",
    whyItMatters:
      "Sensory detail is often reported to help anchor attention in the dream, rather than in your own thoughts about it.",
    howTo:
      "Notice textures, sounds, or temperature around you. Some people find that rubbing their dream-hands together helps.",
  },
  {
    id: "observe-environment",
    title: "Observe the Environment",
    description: "Look closely at your surroundings instead of rushing into action.",
    whyItMatters:
      "Taking a moment to look around is commonly reported to help the dream scene feel more solid and detailed.",
    howTo:
      "Pause and look at the details around you — colors, shapes, light. Let the scene settle before doing anything else.",
  },
  {
    id: "gentle-movement",
    title: "Gentle Movement",
    description: "Move slowly and deliberately within the dream.",
    whyItMatters:
      "Sudden or frantic movement is sometimes reported to destabilize a dream, while slow, purposeful movement tends not to.",
    howTo:
      "Try walking slowly, or simply turning your head to look around, rather than running or moving abruptly.",
  },
  {
    id: "verbal-intention",
    title: "Verbal Intention",
    description: "State a calm, clear intention out loud within the dream.",
    whyItMatters:
      "Many lucid dreamers report that speaking an intention — even simply saying 'stay lucid' — helps reinforce focus.",
    howTo:
      "Say something simple and calm, like 'stay lucid' or 'increase clarity,' and continue observing the dream around you.",
  },
];

export const stabilizationApproachOptions: { id: string; label: string }[] =
  stabilizationTechniques.map((t) => ({ id: t.id, label: t.title }));

export const stabilizationSteps: GuidedSessionStepContent[] = [
  {
    id: "welcome",
    title: "You're Lucid — Now What?",
    purpose: "A calm moment to orient yourself.",
    guidance:
      "This walkthrough covers what many lucid dreamers try in the first moments after realizing they're dreaming. There's no single right way — think of this as a set of options to have ready.",
  },
  {
    id: "remain-calm",
    title: "Remain Calm",
    purpose: "Meet the realization steadily.",
    guidance:
      "The moment you realize you're dreaming, resist the urge to rush. A calm, steady mind is commonly reported to help the dream continue longer.",
  },
  {
    id: "engage-senses",
    title: "Engage the Senses",
    purpose: "Anchor your attention in the dream.",
    guidance:
      "Bring your attention to what you can see, hear, or touch. Some people find rubbing their hands together in the dream helps ground their awareness.",
  },
  {
    id: "observe-environment",
    title: "Observe the Environment",
    purpose: "Let the scene settle around you.",
    guidance:
      "Take a moment to really look at your surroundings — colors, light, texture. Observing tends to help a dream feel more stable and detailed.",
  },
  {
    id: "gentle-movement",
    title: "Try Gentle Movement",
    purpose: "Stay present without overwhelming the dream.",
    guidance:
      "If you feel ready, move slowly and deliberately — a slow walk or a gentle turn of the head, rather than sudden or frantic movement.",
  },
  {
    id: "verbal-intention",
    title: "Set a Verbal Intention",
    purpose: "Reinforce your focus with a simple statement.",
    guidance:
      "Try calmly saying something like 'stay lucid' within the dream. Many lucid dreamers report this helps maintain focus.",
  },
];