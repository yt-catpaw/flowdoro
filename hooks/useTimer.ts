import { useEffect, useRef, useState } from "react";
import { tickTimer, formatSeconds } from "@/lib/timer";

export default function useTimer(initialSeconds = 1500) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function start(newSeconds = initialSeconds) {
    setRemainingSeconds(newSeconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        const nextSeconds = tickTimer(prevSeconds, 1000);

        if (nextSeconds === 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        return nextSeconds;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    remainingSeconds,
    formattedTime: formatSeconds(remainingSeconds),
    start,
  };
}
