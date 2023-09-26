import styled from 'styled-components';
import { Col, Row } from 'antd';
import { BurgerIcon } from '../Burger/BurgerIcon';

export const Container = styled(Row)`
  flex: 1;
`;

export const BurgerCol = styled(Col)`
  z-index: 999;
  display: flex;
`;

export const MobileBurger = styled(BurgerIcon)`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: -0.5rem;
  color: var(--text-main-color);
`;
