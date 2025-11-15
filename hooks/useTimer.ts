import { useEffect, useRef, useState } from "react";
import { formatSeconds, tickTimer } from "@/lib/timer";

export default function useTimer(initialSeconds = 1500) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastDurationRef = useRef(initialSeconds);

  const clearRunningTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = (newSeconds?: number) => {
    const nextSeconds = (() => {
      // 1. start(600) のように引数があれば、その秒数でリセットしてスタート
      if (typeof newSeconds === "number") {
        return newSeconds;
      }
      // 2. 引数なしで再生ボタンを押し、現在の残り時間が 0（完走した直後）なら、
      //    そのタイマーを最後に開始したときの秒数（lastDurationRef）で再スタートする
      if (remainingSeconds === 0) {
        return lastDurationRef.current;
      }
      // 3. それ以外は現在の残り秒数（停止位置）から再開
      return remainingSeconds;
    })();

    if (nextSeconds <= 0) return;

    if (typeof newSeconds === "number") {
      lastDurationRef.current = newSeconds;
    }

    setRemainingSeconds(nextSeconds);
    clearRunningTimer();

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        const next = tickTimer(prevSeconds, 1000);
        if (next === 0) {
          clearRunningTimer();
        }
        return next;
      });
    }, 1000);
  };

  const pause = () => {
    clearRunningTimer();
  };

  useEffect(() => {
    return () => {
      clearRunningTimer();
    };
  }, []);

  return {
    remainingSeconds,
    formattedTime: formatSeconds(remainingSeconds),
    start,
    pause,
  };
}
