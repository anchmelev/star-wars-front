import styled, { css } from 'styled-components';

interface OverlayProps {
  $show: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: absolute;
  z-index: 2;
  height: 0;

  ${(props) =>
    props.$show &&
    css`
      backdrop-filter: blur(6px);
      width: 100vw;
      height: 100vh;
    `}
`;
