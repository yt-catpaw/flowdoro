import { useCallback, useEffect, useRef, useState } from "react";
import { formatSeconds, tickTimer } from "@/lib/timer";
import { playSound } from "@/lib/sound";

type TimerMode = "focus" | "break";
type TimerStatus = "idle" | "running" | "paused";

export default function useTimer(initialSeconds = 1500) {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [durationSeconds, setDurationSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modeRef = useRef<TimerMode>("focus");
  const completionRef = useRef<() => void>(() => {});

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const getDurationByMode = useCallback(
    (targetMode: TimerMode) =>
      targetMode === "focus" ? initialSeconds : 5 * 60,
    [initialSeconds]
  );

  const clearRunningTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const setModeState = useCallback(
    (targetMode: TimerMode) => {
      const duration = getDurationByMode(targetMode);
      setMode(targetMode);
      setDurationSeconds(duration);
      setRemainingSeconds(duration);
    },
    [getDurationByMode]
  );

  const runInterval = useCallback(() => {
    clearRunningTimer();
    intervalRef.current = setInterval(() => {
      let completed = false;

      setRemainingSeconds((prevSeconds) => {
        const next = tickTimer(prevSeconds, 1000);
        if (next === 0) {
          completed = true;
        }
        return next;
      });

      if (completed) {
        clearRunningTimer();
        completionRef.current();
      }
    }, 1000);
  }, [clearRunningTimer]);

  useEffect(() => {
    completionRef.current = () => {
      const completedMode = modeRef.current;
      const nextMode = completedMode === "focus" ? "break" : "focus";
      const sound =
        completedMode === "focus"
          ? "/sounds/break_start.mp3"
          : "/sounds/break_end.mp3";

      void playSound(sound);
      setModeState(nextMode);
      setStatus("running");
      runInterval();
    };
  }, [runInterval, setModeState]);

  const start = useCallback(() => {
    if (status === "running") return;

    if (remainingSeconds <= 0) {
      setModeState(mode);
    }

    setStatus("running");
    runInterval();
  }, [mode, remainingSeconds, runInterval, setModeState, status]);

  const pause = useCallback(() => {
    if (status !== "running") return;
    clearRunningTimer();
    setStatus("paused");
  }, [clearRunningTimer, status]);

  const restart = useCallback(() => {
    setModeState("focus");
    setStatus("running");
    runInterval();
  }, [runInterval, setModeState]);

  useEffect(() => {
    return () => {
      clearRunningTimer();
    };
  }, [clearRunningTimer]);

  return {
    remainingSeconds,
    formattedTime: formatSeconds(remainingSeconds),
    progress:
      durationSeconds === 0
        ? 0
        : (durationSeconds - remainingSeconds) / durationSeconds,
    mode,
    status,
    start,
    pause,
    restart,
  };
}
