import React from 'react';
import * as S from './Loading.style';
import { GlobalSpinner } from '../GlobalSpinner/GlobalSpinner';
import { COLORS } from '@app/styles/constants';

interface LoadingProps {
  size?: string;
  color?: string;
  fixed?: boolean;
  ownWidth?: boolean;
  justify?: 'center' | 'start' | 'end';
}

export const Loading: React.FC<LoadingProps> = ({ fixed, justify = 'center', size, color, ownWidth = false }) => {
  return (
    <S.SpinnerContainer $fixed={fixed} $justify={justify} $ownWidth={ownWidth}>
      <GlobalSpinner size={size} color={color || COLORS.secondary} />
    </S.SpinnerContainer>
  );
};
