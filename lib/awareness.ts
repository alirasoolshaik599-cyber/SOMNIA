// Pure date/streak helpers shared across awareness hooks and pages.

export function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function dateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function computeStreak(doneDates: string[]): number {
  if (doneDates.length === 0) return 0;

  const doneSet = new Set(doneDates);
  const cursor = new Date();

  // If today hasn't been logged yet, the streak is still "alive" through
  // yesterday — start counting from there instead of breaking immediately.
  if (!doneSet.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (doneSet.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function computeLongestStreak(doneDates: string[]): number {
  if (doneDates.length === 0) return 0;

  const sorted = [...new Set(doneDates)].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }

  return longest;
}

export function countInLastNDays(dates: string[], days: number): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0, 0, 0, 0);

  return dates.filter((d) => {
    const date = new Date(d);
    return date >= cutoff;
  }).length;
}

export function countUniqueDaysInLastNDays(dates: string[], days: number): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0, 0, 0, 0);

  const uniqueDays = new Set(dates.filter((d) => new Date(d) >= cutoff));
  return uniqueDays.size;
}