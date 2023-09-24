import React from 'react';
import { Row, Col } from 'antd';

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSider, isSiderOpened }) => {
  return (
    <Row justify="space-between" align="middle">
      <Col></Col>

      <Col>
        <Row align="middle">
          <Col></Col>

          <Col></Col>

          <Col></Col>
        </Row>
      </Col>

      <S.BurgerCol>
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </Row>
  );
};
