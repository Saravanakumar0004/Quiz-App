import { useState, useEffect } from "react";

// 600 -> "10:00"
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function useTimer(startSeconds: number, onEnd: () => void, running: boolean) {
  const [timeLeft, setTimeLeft] = useState<number>(startSeconds);

  // count down 1 second at a time while the quiz is running
  useEffect(() => {
    if (!running) {
      setTimeLeft(startSeconds); // reset when not running
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer); // stop the timer
  }, [running]);

  // when time reaches 0, call onEnd (auto submit)
  useEffect(() => {
    if (running && timeLeft === 0) {
      onEnd();
    }
  }, [timeLeft]);

  return { timeLeft: timeLeft, time: formatTime(timeLeft) };
}

export default useTimer;