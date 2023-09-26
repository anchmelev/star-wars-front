import React from 'react';
import { actions } from '@app/store/slices/rootReducer';
import * as S from './CharacterPagination.style';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHooks';

export type CharacterPaginationProps = {
  total: number;
};

export const CharacterPagination: React.FC<CharacterPaginationProps> = ({ total }) => {
  const { currentPage } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    dispatch(actions.character.setCurrentPage(page));
  };

  return <S.Pagination simple current={currentPage} total={total} onChange={handlePageChange} />;
};
