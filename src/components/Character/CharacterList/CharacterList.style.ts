import { BREAKPOINTS, LAYOUT } from '@app/styles/constants';
import { Empty, Row } from 'antd';
import { styled } from 'styled-components';

export const Header = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #000000;
  padding: ${LAYOUT.desktop.paddingVertical} 0;

  @media only screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: ${LAYOUT.mobile.paddingVertical} 0;
    margin-bottom: 0;
    height: 56px;
  }
`;

export const EmptyList = styled(Empty)`
  margin-top: 80px;
`;
