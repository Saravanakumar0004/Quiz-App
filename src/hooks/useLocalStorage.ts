import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";


function useLocalStorage<T>(
  key: string,
  startValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved) as T;
      }
    } catch (err) {
      return startValue;
    }
    return startValue;
  });

 
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;