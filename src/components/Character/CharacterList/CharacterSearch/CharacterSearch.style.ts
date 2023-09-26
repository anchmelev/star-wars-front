import { BREAKPOINTS } from '@app/styles/constants';
import { Input } from 'antd';
import styled from 'styled-components';

export const CharacterSearch = styled(Input.Search)<{ $focused: boolean }>`
  max-width: 460px;

  @media only screen and (max-width: ${BREAKPOINTS.sm}px) {
    position: ${(props) => (props.$focused ? 'absolute' : 'relevant')};
    max-width: 540px;
  }
`;
