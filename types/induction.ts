export type MildPhrase = {
  text: string;
  updatedAt: string;
};

export type PracticeConfidence = "Low" | "Medium" | "High";

export type PracticeLogEntry = {
  id: string;
  date: string;
  practiced: boolean;
  confidence: PracticeConfidence;
  notes: string;
};

export type NewPracticeLogInput = {
  practiced: boolean;
  confidence: PracticeConfidence;
  notes: string;
};

export type ReadinessLevel = "Not Ready" | "Somewhat Ready" | "Ready" | "Very Ready";

export type GuidedSessionEntry = {
  id: string;
  date: string;
  /** Present for readiness-style reflections (MILD, WBTB, WILD). Omitted for
   *  approach-based reflections (e.g. Stabilization), which use approachesTried instead. */
  readiness?: ReadinessLevel;
  /** Present for multi-select reflections (e.g. Stabilization's "which approaches did you try"). */
  approachesTried?: string[];
  notes: string;
};

export type GuidedSessionStepContent = {
  id: string;
  title: string;
  purpose: string;
  guidance: string;
};