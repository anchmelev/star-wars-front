import styled from 'styled-components';
import { Card, Col, Row, Divider as AntDivider, Typography } from 'antd';

export const CardContainer = styled(Card)`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:hover {
    z-index: 1;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }

  .ant-card-body {
    padding: 0;
    width: 100%;
  }
`;

export const MainText = styled(Typography.Text)`
  font-size: 18px;
`;

export const CardBody = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

export const Cell = styled(Col)<{ $ownWidth?: boolean; $center?: boolean }>`
  height: 100%;
  align-items: center;
  display: flex;
  flex: ${(props) => (props.$ownWidth ? 0 : 1)};
  justify-content: ${(props) => (props.$center ? 'center' : 'flex-start')};
`;

export const Divider = styled(AntDivider)`
  height: 32px;
  margin-right: 8px;
`;
