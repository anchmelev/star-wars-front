import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Page } from '@app/router/Page';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Home',
    key: 'home',
    url: Page.home,
    icon: <HomeOutlined />,
  },
];
