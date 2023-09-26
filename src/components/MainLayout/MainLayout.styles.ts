import styled from 'styled-components';
import { LAYOUT, media } from '@app/styles/constants';
import { Layout } from 'antd';

export const LayoutMaster = styled(Layout)`
  height: 100vh;
`;

export const LayoutMain = styled(Layout)`
  @media only screen and ${media.md} {
    margin-left: 80px;
  }

  @media only screen and ${media.xl} {
    margin-left: unset;
  }
`;

export const Header = styled(Layout.Header)`
  display: flex;
  line-height: 1.5;
  padding-left: 0.5em;
  padding-right: 1.25em;
  /* height: 56px; */

  @media only screen and ${media.md} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
    height: ${LAYOUT.desktop.headerHeight};
  }
`;

export const MainContent = styled(Layout.Content)`
  padding: ${LAYOUT.mobile.paddingVertical} ${LAYOUT.mobile.paddingHorizontal};
  padding-top: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and ${media.md} {
    padding: 0 ${LAYOUT.desktop.paddingHorizontal};
  }
`;
