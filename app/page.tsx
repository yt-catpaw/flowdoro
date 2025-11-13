import TimerControls from "@/components/TimerControls";
import TimerDial from "@/components/timer/TimerDial";

const focusMinutes = 25;
const progress = 0.68;

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8f6ff] px-4 py-16 text-sky-950">
      <div className="flex w-full max-w-xl flex-col items-center gap-10 text-center lg:max-w-[1100px] lg:gap-16">
        <header className="text-sky-900">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-600">
            Flowdoro
          </p>
        </header>

        <div
          className="w-full rounded-[48px] bg-[#c8ecff]/80 px-10 py-12 shadow-2xl sm:px-16 lg:rounded-[56px] lg:px-24 lg:py-16"
          style={{ boxShadow: cardShadow }}
        >
          <div className="flex flex-col items-center gap-8">
            <TimerDial minutes={focusMinutes} progress={progress} />

            <TimerControls />
          </div>
        </div>
      </div>
    </div>
  );
}
