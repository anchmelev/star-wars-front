import styled from 'styled-components';

export const SpinnerContainer = styled.div<{ $fixed?: boolean; $ownWidth: boolean; $justify: string }>`
  height: ${(props) => (props.$fixed ? '100vh' : '100%')};
  width: ${(props) => (props.$ownWidth ? 'initial' : '100%')};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justify};
`;
