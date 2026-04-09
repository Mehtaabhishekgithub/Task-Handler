import { useState, useEffect, useRef } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Use a ref to avoid stale key in effect
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    try {
      localStorage.setItem(keyRef.current, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [value]);

  return [value, setValue];
}
