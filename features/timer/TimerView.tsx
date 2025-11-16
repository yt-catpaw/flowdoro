"use client";

import { useEffect } from "react";

import TimerControls from "@/components/TimerControls";
import TimerDial from "@/components/timer/TimerDial";
import useTimer from "@/hooks/useTimer";
import { requestSoundPermission } from "@/lib/sound";

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";

export default function TimerView() {
  const { formattedTime, start, pause, restart, mode } = useTimer();
  const [minutes = "00", seconds = "00"] = formattedTime.split(":");
  const modeLabel = mode === "focus" ? "Focus" : "Break";

  useEffect(() => {
    requestSoundPermission();
  }, []);

  return (
    <div
      className="w-full rounded-[48px] bg-[#c8ecff]/80 px-10 py-12 shadow-2xl sm:px-16 lg:rounded-[56px] lg:px-24 lg:py-16"
      style={{ boxShadow: cardShadow }}
    >
      <div className="flex flex-col items-center gap-8">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-sky-600">
          {modeLabel}
        </p>
        <TimerDial minutes={minutes} seconds={seconds} progress={0} />
        <TimerControls
          onRestart={() => restart()}
          onPlay={() => start()}
          onPause={pause}
        />
      </div>
    </div>
  );
}
