import React, { Suspense } from 'react';
import { Loading } from '@app/components/Loading/Loading';

type ReturnType<T> = (props: T) => JSX.Element;

export const withLoading = <T extends object>(Component: React.ComponentType<T>): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<Loading fixed />}>
      <Component {...props} />
    </Suspense>
  );
};
