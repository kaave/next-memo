import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => {
      if (savedCallback.current) savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
