import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation } from './sidebarNavigation';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

export const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const location = useLocation();

  const currentMenuItem = sidebarNavigation.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      onClick={() => setCollapsed(true)}
      items={sidebarNavigation.map((nav) => ({
        key: nav.key,
        title: nav.title,
        label: <Link to={nav.url || ''}>{nav.title}</Link>,
        icon: nav.icon,
      }))}
    />
  );
};
