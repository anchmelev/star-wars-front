import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Page } from '@app/router/Page';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

console.log('Page', Page);

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Home',
    key: 'home',
    url: Page.home,
    icon: <HomeOutlined />,
  },
];
