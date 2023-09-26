import { WithChildrenProps } from '@app/types/commonTypes';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PageTitle: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | Start Wars</title>
    </Helmet>
  );
};
