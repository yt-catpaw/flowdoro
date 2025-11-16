import type { ComponentProps, ReactNode } from "react";

type CircleButtonProps = {
  children: ReactNode;
  shadow?: string;
  colorClass?: string;
} & ComponentProps<"button">;

const defaultShadow =
  "10px 10px 25px rgba(168, 204, 226, 0.6), -10px -10px 25px rgba(255, 255, 255, 0.8)";

export default function CircleButton({
  children,
  className = "",
  shadow = defaultShadow,
  disabled,
  colorClass = "text-sky-600 hover:text-sky-800",
  ...props
}: CircleButtonProps) {
  return (
    <button
      className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/90 ${colorClass} transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 lg:h-20 lg:w-20 ${className}`}
      style={{ boxShadow: shadow }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
