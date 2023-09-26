import React from 'react';
import * as S from './Error.styles';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Page } from '@app/router/Page';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ErrorProps {
  img: string;
  msg: string;
}

export const Error: React.FC<ErrorProps> = ({ img, msg }) => {
  return (
    <S.Wrapper>
      <S.ErrorImage preview={false} src={img} />
      <S.ContentWrapper>
        <S.Title>Oops!</S.Title>
        <S.Text>{msg}</S.Text>
        <Link to={Page.home}>
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Return to Home
          </Button>
        </Link>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
