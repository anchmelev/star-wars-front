import { useState, useCallback } from 'react';

export const useForceUpdate = () => {
  const [, setRefreshKey] = useState(0);

  const forceUpdate = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return forceUpdate;
};
