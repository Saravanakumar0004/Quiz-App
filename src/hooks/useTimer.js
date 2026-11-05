import { useState, useEffect } from "react";


export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function useTimer(startSeconds, onEnd, running) {
  const [timeLeft, setTimeLeft] = useState(startSeconds);


  useEffect(() => {
    if (!running) {
      setTimeLeft(startSeconds); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [running]);


  useEffect(() => {
    if (running && timeLeft === 0) {
      onEnd();
    }
  }, [timeLeft]);

  return { timeLeft: timeLeft, time: formatTime(timeLeft) };
}

export default useTimer;