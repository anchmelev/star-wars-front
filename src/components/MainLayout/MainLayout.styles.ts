import styled from 'styled-components';
import { LAYOUT, media } from '@app/styles/constants';
import { Layout } from 'antd';

export const LayoutMaster = styled(Layout)`
  height: 100vh;
`;

export const LayoutMain = styled(Layout)`
  @media only screen and ${media.md} {
    /* margin-left: 80px; */
  }

  @media only screen and ${media.xl} {
    margin-left: unset;
  }
`;

export const Header = styled(Layout.Header)`
  line-height: 1.5;

  @media only screen and ${media.md} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
    height: ${LAYOUT.desktop.headerHeight};
  }
`;

export const MainContent = styled(Layout.Content)`
  padding: ${LAYOUT.mobile.paddingVertical} ${LAYOUT.mobile.paddingHorizontal};
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and ${media.md} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
  }
`;
