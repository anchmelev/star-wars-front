import styled from 'styled-components';
import { COLORS } from '@app/styles/constants';
import { Menu as AntMenu } from 'antd';

export const Menu = styled(AntMenu)`
  background: transparent;
  border-right: 0;

  a {
    width: 100%;
    display: block;
  }

  .ant-menu-item,
  .ant-menu-submenu {
    font-size: 0.875rem;
  }

  .ant-menu-item-icon {
    width: 1.25rem;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow,
  span[role='img'],
  a,
  .ant-menu-item,
  .ant-menu-submenu {
    color: ${COLORS.textSiderSecondary};
    fill: ${COLORS.textSiderSecondary};
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a,
    .ant-menu-item-icon,
    .ant-menu-title-content {
      color: ${COLORS.textSiderPrimary};
      fill: ${COLORS.textSiderPrimary};
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      color: ${COLORS.textSiderPrimary};

      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'] {
        color: ${COLORS.textSiderPrimary};
        fill: ${COLORS.textSiderPrimary};
      }
    }
  }

  .ant-menu-item-selected {
    background-color: transparent !important;

    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    .ant-menu-item-icon,
    a {
      color: ${COLORS.textSiderPrimary};
      fill: ${COLORS.textSiderPrimary};
    }
  }

  .ant-menu-item-active,
  .ant-menu-submenu-active .ant-menu-submenu-title {
    background-color: transparent !important;
  }
`;
