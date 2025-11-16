type TimerDialProps = {
  minutes: string;
  seconds: string;
  progress: number; // 0 - 1
  variant?: "focus" | "break";
};

const dialShadow =
  "inset 18px 18px 35px rgba(156, 191, 212, 0.35), inset -18px -18px 35px rgba(255, 255, 255, 0.9)";

const dialTheme = {
  focus: {
    gradient: "#3fb5ff",
    textClass: "text-sky-800",
    track: "rgba(255,255,255,0.4)",
  },
  break: {
    gradient: "#34d399",
    textClass: "text-emerald-800",
    track: "rgba(255,255,255,0.5)",
  },
} as const;

export default function TimerDial({
  minutes,
  seconds,
  progress,
  variant = "focus",
}: TimerDialProps) {
  const progressDeg = progress * 360;
  const theme = dialTheme[variant];

  return (
    <div
      className="relative h-64 w-64 rounded-full bg-white/60 lg:h-80 lg:w-80"
      style={{
        background: `conic-gradient(${theme.gradient} ${progressDeg}deg, ${theme.track} ${progressDeg}deg 360deg)`,
        boxShadow: dialShadow,
      }}
    >
      <div className="absolute inset-4 rounded-full bg-white/80 shadow-inner" />
      <div className="absolute inset-4 flex items-center justify-center lg:inset-6">
        <span className={`text-6xl font-semibold lg:text-7xl ${theme.textClass}`}>
          {minutes}:{seconds}
        </span>
      </div>
      <div className="absolute inset-6">
        <div className="absolute right-3 top-3 h-5 w-10 rounded-full bg-white/60 blur-[6px]" />
      </div>
    </div>
  );
}
