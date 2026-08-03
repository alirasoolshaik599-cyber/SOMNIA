import { getCurrentWeekDates } from "@/lib/mild";

type PracticeCalendarProps = {
  practicedDates: string[];
};

export default function PracticeCalendar({ practicedDates }: PracticeCalendarProps) {
  const weekDays = getCurrentWeekDates();
  const practicedSet = new Set(practicedDates);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-6">
      <p className="mb-4 text-sm text-slate-400">This week</p>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const practiced = practicedSet.has(day.date);
          return (
            <div key={day.date} className="flex flex-col items-center gap-2">
              <span
                className={`text-xs ${day.isToday ? "font-semibold text-white" : "text-slate-500"}`}
              >
                {day.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
                  practiced
                    ? "border-[#5B6EFF] bg-[#5B6EFF] text-white"
                    : day.isToday
                    ? "border-[#5B6EFF]/40 bg-black/30 text-transparent"
                    : "border-white/10 bg-black/20 text-transparent"
                }`}
                aria-hidden="true"
              >
                ✓
              </div>
              <span className="sr-only">
                {day.label}: {practiced ? "Practiced" : "Not practiced"}
                {day.isToday ? " (today)" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}