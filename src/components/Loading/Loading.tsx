import React from 'react';
import * as S from './Loading.style';
import { GlobalSpinner } from '../GlobalSpinner/GlobalSpinner';

interface LoadingProps {
  size?: string;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <S.SpinnerContainer>
      <GlobalSpinner size={size} color={color || '#339CFD'} />
    </S.SpinnerContainer>
  );
};
