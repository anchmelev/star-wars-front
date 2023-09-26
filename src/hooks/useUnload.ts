import { useEffect } from 'react';

export const useUnload = (fn: (e: BeforeUnloadEvent) => unknown, ...deps: unknown[]) => {
  useEffect(() => {
    window.addEventListener('beforeunload', fn);
    return () => {
      window.removeEventListener('beforeunload', fn);
    };
  }, [fn, ...deps]);
};
