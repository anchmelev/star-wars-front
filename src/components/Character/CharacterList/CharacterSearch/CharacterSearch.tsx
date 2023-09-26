import React, { useState } from 'react';
import * as S from './CharacterSearch.style';
import { actions } from '@app/store/slices/rootReducer';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHooks';

export type CharacterSearchProps = {
  loading: boolean;
};

export const CharacterSearch: React.FC<CharacterSearchProps> = ({ loading }) => {
  const [focused, setFocused] = useState(false);
  const search = useAppSelector((state) => state.character.search);

  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    dispatch(actions.character.setSearch(value));
    dispatch(actions.character.setCurrentPage(1));
  };

  return (
    <S.CharacterSearch
      value={search}
      allowClear
      $focused={focused}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Enter character name"
      onChange={(e) => onSearch(e.target.value)}
      onSearch={onSearch}
      loading={loading}
    />
  );
};
