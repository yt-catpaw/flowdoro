const focusMinutes = 25;
const progress = 0.68; // how much of the session has elapsed

const cardShadow =
  "35px 35px 70px rgba(165, 201, 223, 0.65), -25px -25px 60px rgba(255, 255, 255, 0.9)";
const dialShadow =
  "inset 18px 18px 35px rgba(156, 191, 212, 0.35), inset -18px -18px 35px rgba(255, 255, 255, 0.9)";

const buttons = [
  {
    label: "Restart",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-9 w-9 stroke-current lg:h-11 lg:w-11"
        strokeWidth="2"
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5c3.866 0 7 3.134 7 7s-3.134 7-7 7"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5c-3.2 0-6.2 1.5-8.2 4L2.5 10.7"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v4h4" />
      </svg>
    ),
  },
  {
    label: "Play",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-14 w-14 fill-current lg:h-16 lg:w-16"
      >
        <path d="M9 7.5v9l7.5-4.5L9 7.5Z" />
      </svg>
    ),
  },
  {
    label: "Pause",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-10 w-10 stroke-current lg:h-12 lg:w-12"
        strokeWidth="2.2"
        fill="none"
      >
        <path d="M9 7v10" strokeLinecap="round" />
        <path d="M15 7v10" strokeLinecap="round" />
      </svg>
    ),
  },
];

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

            <div className="flex gap-5 lg:gap-8">
              {buttons.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-sky-600 transition hover:-translate-y-0.5 hover:text-sky-800 lg:h-20 lg:w-20"
                  style={{
                    boxShadow:
                      "10px 10px 25px rgba(168, 204, 226, 0.6), -10px -10px 25px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
