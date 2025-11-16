"use client";

import { useEffect } from "react";

import TimerControls from "@/components/TimerControls";
import TimerDial from "@/components/timer/TimerDial";
import useTimer from "@/hooks/useTimer";
import { requestSoundPermission } from "@/lib/sound";

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";

const themes = {
  focus: {
    label: "Focus",
    background: "bg-[#c8ecff]/80",
    labelText: "text-sky-600",
    border: "border border-sky-100/70",
    dialVariant: "focus" as const,
    controlsVariant: "focus" as const,
  },
  break: {
    label: "Break",
    background: "bg-[#dff8e8]/80",
    labelText: "text-emerald-600",
    border: "border border-emerald-100/60",
    dialVariant: "break" as const,
    controlsVariant: "break" as const,
  },
};

export default function TimerView() {
  const { formattedTime, start, pause, restart, mode, progress } = useTimer();
  const [minutes = "00", seconds = "00"] = formattedTime.split(":");
  const theme = themes[mode];

  useEffect(() => {
    requestSoundPermission();
  }, []);

  return (
    <div
      className={`w-full rounded-[48px] px-10 py-12 shadow-2xl sm:px-16 lg:rounded-[56px] lg:px-24 lg:py-16 ${theme.background} ${theme.border}`}
      style={{ boxShadow: cardShadow }}
    >
      <div className="flex flex-col items-center gap-8">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.5em] ${theme.labelText}`}
        >
          {theme.label}
        </p>
        <TimerDial
          minutes={minutes}
          seconds={seconds}
          progress={progress}
          variant={theme.dialVariant}
        />
        <TimerControls
          onRestart={() => restart()}
          onPlay={() => start()}
          onPause={pause}
          variant={theme.controlsVariant}
        />
      </div>
    </div>
  );
}
