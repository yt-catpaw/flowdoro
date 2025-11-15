"use client";

import TimerControls from "@/components/TimerControls";
import TimerDial from "@/components/timer/TimerDial";
import useTimer from "@/hooks/useTimer";

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";

export default function TimerView() {
  const { formattedTime, start, pause } = useTimer();
  const [minutes = "00", seconds = "00"] = formattedTime.split(":");

  return (
    <div
      className="w-full rounded-[48px] bg-[#c8ecff]/80 px-10 py-12 shadow-2xl sm:px-16 lg:rounded-[56px] lg:px-24 lg:py-16"
      style={{ boxShadow: cardShadow }}
    >
      <div className="flex flex-col items-center gap-8">
        <TimerDial minutes={minutes} seconds={seconds} progress={0} />
        <TimerControls onPlay={() => start()} onPause={pause} />
      </div>
    </div>
  );
}
