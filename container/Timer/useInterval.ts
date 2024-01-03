import { useEffect, useRef } from "react";

/**
 * This code was adapted for react-native from
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export default function useInterval(callback: () => void, delay) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
