# SOMNIA — Architecture Overview

This file orients any future contributor (human or AI) to how the app is
structured, so new phases extend existing patterns instead of reinventing
them. Keep this updated when a new shared pattern is introduced.

## High-Level Structure

SOMNIA is a Next.js App Router project. Each major feature area is a phase:

- `/journal`, `/timeline`, `/dream/*` — Phase 1: Dream Recall
- `/awareness/*` — Phase 2: Awareness
- `/sleep/*` — Phase 3: Sleep Preparation
- `/induction/*` — Phase 4/5: Lucid Dream Induction (MILD, WBTB, WILD, plus
  overview-only SSILD/FILD)
- `/mastery/*` — Phase 6: Lucid Dream Mastery (Stabilization, Dream Control,
  Personal Growth)

Every phase follows the same page shape: `PageBackground` + `PageNav`
(back link) + `PageHeader` (title/description) + an optional in-phase tab
row (`SleepNav`, `AwarenessNav`, `InductionNav`, `MasteryNav`) + content +
`LoadingState`/`EmptyState` as needed.

## Navigation Architecture

**`components/layout/GlobalNav.tsx`** is the single cross-phase navigation
surface — a fixed trigger + slide-in drawer, mounted once in `app/layout.tsx`.

**`navGroups` inside `GlobalNav.tsx` is the one and only extension point for
adding a new phase or section to global navigation.** Adding a new area to
the app means adding one object to that array — nothing else needs to
change. Do not add cross-phase links scattered across individual pages;
that pattern was actively removed in Sprint 5D because it didn't scale.

Per-phase tab rows (`SleepNav`, `AwarenessNav`, `InductionNav`, `MasteryNav`)
are a second, smaller layer — quick jumps *within* a phase. They render as a
horizontally-scrolling pill row (not wrapping) so they stay usable as a
phase grows sub-pages. If a phase nav grows past roughly 8–10 tabs, revisit
whether it needs its own drawer instead of scrolling.

## Storage Architecture

Every piece of persisted data lives in `localStorage`, one key per concern,
owned by exactly one hook:

| Phase | Hook | Storage key |
|---|---|---|
| Dream Recall | `useDreams` | `somnia_dreams` |
| Awareness | `useRealityChecks` | `somnia_reality_checks` |
| Awareness | `useDailyAwareness` | `somnia_daily_awareness` |
| Sleep | `useRoutine` | `somnia_bedtime_routine` |
| Sleep | `useSleepSchedule` | `somnia_sleep_schedule` |
| Sleep | `useDreamIntention` | `somnia_dream_intention` |
| Sleep | `useRelaxationExercises` | `somnia_relaxation_exercises` |
| Sleep | `useEveningReflection` | `somnia_evening_reflection` |
| Sleep | `useSleepQualityLog` | `somnia_sleep_quality_log` |
| Sleep | `usePreSleepChecklist` | `somnia_pre_sleep_checklist` |
| Induction (MILD) | `useMildPhrase` | `somnia_mild_phrase` |
| Induction (MILD) | `usePracticeLog` | `somnia_mild_practice_log` |
| Induction (MILD) | `useGuidedSessionLog` | `somnia_mild_guided_sessions` |
| Induction (WBTB) | `usePracticeLog` | `somnia_wbtb_practice_log` |
| Induction (WBTB) | `useGuidedSessionLog` | `somnia_wbtb_guided_sessions` |
| Induction (WILD) | `usePracticeLog` | `somnia_wild_practice_log` |
| Induction (WILD) | `useGuidedSessionLog` | `somnia_wild_guided_sessions` |
| Mastery (Stabilization) | `useGuidedSessionLog` | `somnia_stabilization_sessions` |

`usePracticeLog(storageKey, idPrefix)` and `useGuidedSessionLog(storageKey,
idPrefix)` (in `hooks/`) are **generic** — any future technique or practice
area should reuse these two hooks with a new key, not write a new
technique-specific hook. MILD originally had its own hand-written hooks;
these were consolidated onto the generic versions in Sprint 5D once WBTB
proved the generic hooks were stable. Follow that same path for any future
one-off hook that turns out to be a duplicate shape.

Every hook follows the same internal shape: load from `localStorage` in a
mount-only effect, persist in a second effect gated on a `hasLoaded` flag
(so a mid-load empty state never overwrites real stored data), and expose
stable `useCallback`-wrapped mutators.

## Aggregation Layer

**`lib/growthSummary.ts`** is the one place cross-phase data is combined
for display (Personal Growth, `/mastery/growth`). It is a pure function:
no hooks, no `localStorage` access, no React import. The page component is
the only place that calls the underlying hooks; it passes their `entries`/
data arrays into `computeGrowthSummary()`.

Rule for any future cross-phase view: **read via the existing hooks,
aggregate via a pure `lib/` function, never write, never duplicate a
storage read.** If a phase's storage shape changes, only that phase's
type + the corresponding field in `GrowthInputs`/`computeGrowthSummary`
need updating — the rest of the aggregation logic is unaffected.

## Shared Component Reuse Map

These components are used across more than one phase — treat them as
the shared library, not phase-specific:

- `PageBackground`, `PageHeader`, `PageNav` (`components/layout/`) — every page.
- `Button`, `PillLink`, `TextField`, `TextArea`, `ConfirmDialog`,
  `CheckToggle`, `Toggle`, `RatingPills`, `MultiSelectPills`, `StatBox`,
  `EmptyState`, `LoadingState`, `SectionHeading`, `HubCard`,
  `GuidedStepCard` (`components/ui/`) — reused across Dream, Awareness,
  Sleep, Induction, and Mastery.
- `GuidedInductionSession`, `PracticeCalendar`, `PracticeEntryRow`,
  `LastPracticeSummary` (`components/induction/`) — despite the folder
  name, these are technique-agnostic and are already used by both
  `/induction/*` and `/mastery/stabilization`. **Known naming debt**: a
  future pass could relocate these into a phase-neutral folder (e.g.
  `components/practice/`) — deferred multiple times (6A, 6B) as
  low-urgency; still valid, still optional.

## Extension Points for Future Development

1. **New global nav entry** → add one object to `navGroups` in `GlobalNav.tsx`.
2. **New practice-tracked feature** (a technique, exercise, or nightly
   check-in) → `usePracticeLog`/`useGuidedSessionLog` with a new storage
   key, `GuidedInductionSession` for any step-by-step flow, `PracticeCalendar`/
   `PracticeEntryRow`/`LastPracticeSummary` for history.
3. **New reference-only content library** (no logging) → `GuidedStepCard`
   per topic, following Dream Control's or Sleep's Relaxation library pattern.
4. **New cross-phase summary or dashboard** → extend `GrowthInputs` in
   `growthSummary.ts` with the new phase's data, add a derived field to
   `GrowthSummary`, keep the function pure.