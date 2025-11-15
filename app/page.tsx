import TimerView from "@/features/timer/TimerView";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8f6ff] px-4 py-16 text-sky-950">
      <div className="flex w-full max-w-xl flex-col items-center gap-10 text-center lg:max-w-[1100px] lg:gap-16">
        <header className="text-sky-900">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-600">
            Flowdoro
          </p>
        </header>

        <TimerView />
      </div>
    </div>
  );
}
