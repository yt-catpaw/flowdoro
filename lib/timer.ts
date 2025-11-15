export function tickTimer(remainingSeconds: number, deltaMs: number) {
  const next = remainingSeconds - Math.floor(deltaMs / 1000);

  return Math.max(next, 0);
}

export function formatSeconds(totalSeconds: number) {
  const safeSeconds = Math.max(totalSeconds, 0);

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  const minutesLabel = String(minutes).padStart(2, "0");
  const secondsLabel = String(seconds).padStart(2, "0");

  return `${minutesLabel}:${secondsLabel}`;
}
