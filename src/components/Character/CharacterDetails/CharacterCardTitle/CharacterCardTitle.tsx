import React from 'react';
import { Space } from 'antd';
import { BackButton } from '@app/components/BackButton/BackButton';
import * as S from './CharacterCardTitle.style';

export type CharacterCardTitleProps = {
  title: string;
  to?: string;
};

export const CharacterCardTitle: React.FC<CharacterCardTitleProps> = ({ title, to }) => {
  return (
    <Space>
      <BackButton to={to} />
      <S.Text>{title}</S.Text>
    </Space>
  );
};
