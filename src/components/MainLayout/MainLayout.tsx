import React, { useState } from 'react';
import * as S from './MainLayout.styles';
import { Outlet } from 'react-router-dom';
import { MainSider } from '@app/components/MainSider/MainSider';
import { useResponsive } from '@app/hooks/useResponsive';
import { Header } from '@app/components/MainHeader/Header';

export const MainLayout: React.FC = () => {
  const { mobileOnly } = useResponsive();

  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  return (
    <S.LayoutMaster>
      <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
      <S.LayoutMain>
        {mobileOnly && (
          <S.Header>
            <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} />
          </S.Header>
        )}
        <S.MainContent>
          <div>
            <Outlet />
          </div>
        </S.MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};
