import { dateKey } from "@/lib/awareness";

export type WeekDay = {
  date: string;
  label: string;
  isToday: boolean;
};

// Sunday-start week — used only for the lightweight practice calendar display.
export function getCurrentWeekDates(): WeekDay[] {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const todayStr = dateKey(today);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    const key = dateKey(d);
    return {
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: key === todayStr,
    };
  });
}