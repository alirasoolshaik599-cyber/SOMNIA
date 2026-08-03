"use client";

import { computeSleepDurationMinutes, formatDuration, formatTimeLabel } from "@/lib/sleep";

type SleepScheduleCardProps = {
  bedtime: string;
  wakeTime: string;
  onBedtimeChange: (value: string) => void;
  onWakeTimeChange: (value: string) => void;
};

export default function SleepScheduleCard({
  bedtime,
  wakeTime,
  onBedtimeChange,
  onWakeTimeChange,
}: SleepScheduleCardProps) {
  const durationMinutes = computeSleepDurationMinutes(bedtime, wakeTime);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="bedtime" className="mb-3 block text-lg font-medium text-white">
            Bedtime
          </label>
          <input
            id="bedtime"
            type="time"
            value={bedtime}
            onChange={(e) => onBedtimeChange(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 focus:border-[#5B6EFF]"
          />
        </div>

        <div>
          <label htmlFor="wake-time" className="mb-3 block text-lg font-medium text-white">
            Wake Time
          </label>
          <input
            id="wake-time"
            type="time"
            value={wakeTime}
            onChange={(e) => onWakeTimeChange(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 focus:border-[#5B6EFF]"
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#5B6EFF]/20 bg-[#5B6EFF]/10 p-6 text-center">
        <p className="text-3xl font-bold text-white">{formatDuration(durationMinutes)}</p>
        <p className="mt-2 text-sm text-slate-400">
          Tonight: {formatTimeLabel(bedtime)} → {formatTimeLabel(wakeTime)}
        </p>
      </div>
    </div>
  );
}