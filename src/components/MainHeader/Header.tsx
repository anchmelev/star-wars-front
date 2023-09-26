import React from 'react';
import * as S from './Header.styles';
import { Logo } from '../MainSider/Logo/Logo';

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSider, isSiderOpened }) => {
  return (
    <S.Container justify="space-between" align="middle">
      <Logo />

      <S.BurgerCol>
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </S.Container>
  );
};
