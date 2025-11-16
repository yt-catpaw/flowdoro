import TimerView from "@/features/timer/TimerView";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-16 text-white"
      style={{
        backgroundColor: "#0f4c81",
        backgroundImage:
          "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 75% 0%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06), transparent 50%), repeating-linear-gradient(140deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 10px)",
      }}
    >
      <div className="flex w-full max-w-xl flex-col items-center gap-10 text-center lg:max-w-[1100px] lg:gap-16">
        <header className="text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-200">
            Flowdoro
          </p>
        </header>

        <TimerView />
      </div>
    </div>
  );
}
