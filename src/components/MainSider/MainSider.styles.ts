import styled, { css } from 'styled-components';
import { media, LAYOUT, COLORS } from '@app/styles/constants';
import { Button, Layout } from 'antd';

export const Sider = styled(Layout.Sider)<{ $fixed: boolean }>`
  position: ${(props) => (props.$fixed ? `relative` : 'fixed!important')};
  overflow: visible;
  right: 0;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;

  color: var(--text-secondary-color);

  @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }

  @media only screen and ${media.xl} {
    position: unset;
  }
`;

export const CollapseButton = styled(Button)<{ $isCollapsed: boolean }>`
  transition: all 0.2s ease;
  position: absolute;
  right: 0.5rem;

  ${(props) =>
    props.$isCollapsed &&
    css`
      right: -0.75rem;
    `}

  &:hover {
    color: ${COLORS.textSecondary};
  }

  &:focus {
    color: ${COLORS.primary};
  }
`;

export const SiderContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - ${LAYOUT.mobile.headerHeight});

  @media only screen and ${media.md} {
    max-height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  }
`;

export const SiderLogoDiv = styled.div`
  height: ${LAYOUT.mobile.headerHeight};
  max-height: ${LAYOUT.mobile.headerHeight};
  padding: 0 ${LAYOUT.mobile.headerPadding};
  margin-top: 0.15em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and ${media.md} {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;
