import React from 'react';
import { ButtonProps } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as S from './BackButton.style';

export type BackButtonProps = ButtonProps & {
  to?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ to, ...props }) => {
  const navigate = useNavigate();
  const path = (to || -1) as unknown as number;
  return <S.Button shape="circle" size="small" icon={<LeftOutlined />} onClick={() => navigate(path)} {...props} />;
};
