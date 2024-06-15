import { useGetState } from "ahooks";
import { useCallback, useRef } from "react";

export default function useCountdown(initialValue: number) {
  const [countdown, setCountdown, getCountdown] = useGetState(initialValue);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetCountdown = useCallback(
    (defaultValue = initialValue) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setCountdown(defaultValue);

      timer.current = setTimeout(() => {
        const cur = getCountdown();
        if (cur > 0) {
          setCountdown(cur - 1);
        } else {
          setCountdown(0);
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
        }
      }, 1000);
    },
    [initialValue]
  );

  return { countdown, resetCountdown, isCoolingDown: countdown > 0 };
}
