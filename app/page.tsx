import TimerControls from "@/components/TimerControls";

const focusMinutes = 25;
const progress = 0.68; // how much of the session has elapsed

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";
const dialShadow =
  "inset 18px 18px 35px rgba(156, 191, 212, 0.35), inset -18px -18px 35px rgba(255, 255, 255, 0.9)";

export default function Home() {
  const progressDeg = progress * 360;

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
            <div
              className="relative h-64 w-64 rounded-full bg-white/60 lg:h-80 lg:w-80"
              style={{
                background: `conic-gradient(#3fb5ff ${progressDeg}deg, rgba(255,255,255,0.4) ${progressDeg}deg 360deg)`,
                boxShadow: dialShadow,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-white/80 shadow-inner" />
              <div className="absolute inset-4 flex items-center justify-center lg:inset-6">
                <span className="text-6xl font-semibold text-sky-800 lg:text-7xl">
                  {String(focusMinutes).padStart(2, "0")}:00
                </span>
              </div>
              <div className="absolute inset-6">
                <div className="absolute right-3 top-3 h-5 w-10 rounded-full bg-white/60 blur-[6px]" />
              </div>
            </div>

            <TimerControls />
          </div>
        </div>
      </div>
    </div>
  );
}
