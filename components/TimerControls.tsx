import CircleButton from "@/components/ui/button/CircleButton";

type TimerControlsProps = {
  onRestart?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  variant?: "focus" | "break";
};

const buttons = [
  {
    label: "Restart",
    action: "restart" as const,
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
    action: "play" as const,
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
    action: "pause" as const,
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
] as const;

export default function TimerControls({
  onRestart,
  onPlay,
  onPause,
  variant = "focus",
}: TimerControlsProps) {
  const colorClass =
    variant === "break"
      ? "text-emerald-600 hover:text-emerald-800"
      : "text-sky-600 hover:text-sky-800";

  return (
    <div className="flex gap-5 lg:gap-8">
      {buttons.map(({ label, icon, action }) => {
        let handleClick: (() => void) | undefined;

        if (action === "play") {
          handleClick = onPlay;
        } else if (action === "pause") {
          handleClick = onPause;
        } else {
          handleClick = onRestart;
        }

        const isDisabled = !handleClick;

        return (
          <CircleButton
            key={label}
            aria-label={label}
            onClick={handleClick}
            disabled={isDisabled}
            colorClass={colorClass}
          >
            {icon}
          </CircleButton>
        );
      })}
    </div>
  );
}
