import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '@app/styles/constants';

export const BrandSpan = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
  white-space: nowrap;
  color: ${COLORS.primary};
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;
