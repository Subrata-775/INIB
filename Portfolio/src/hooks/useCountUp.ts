import { useEffect, useRef, useState } from 'react';

/**
 * Returns true when `targetValue` has been counted up to from 0,
 * animated over `duration` ms. Starts when `start` becomes true.
 */
export function useCountUp(targetValue: number, duration = 1800, start = true) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * targetValue));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [targetValue, duration, start]);

  return value;
}
