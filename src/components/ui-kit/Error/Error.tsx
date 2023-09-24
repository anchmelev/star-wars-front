import React from 'react';
import * as S from './Error.styles';
import { Link } from 'react-router-dom';

interface ErrorProps {
  img: string;
  msg: string;
}

export const Error: React.FC<ErrorProps> = ({ img, msg }) => {
  return (
    <S.Wrapper>
      <S.ErroImage preview={false} src={img} />
      <S.ContentWrapper>
        <S.Title>Oops!</S.Title>
        <S.Text>{msg}</S.Text>
        <Link to="/" className="ant-btn ant-btn-link">
          Return to Home
        </Link>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
