import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Empty } from 'antd';
import { CharacterCard } from './CharacterCard/CharacterCard';
import { createCharacter } from '@app/store/slices/characterSlice/characterSlice';
import { CharacterPagination } from './CharacterPagination/CharacterPagination';
import { CharacterSearch } from './CharacterSearch/CharacterSearch';
import * as S from './CharacterList.style';
import { useAppSelector } from '@app/hooks/storeHooks';
import { CardLoading } from './CharacterCard/CardLoading';
import { useQuery } from 'react-query';
import { getCharacters } from '@app/api/character.api';
import { useDebounce } from 'use-debounce';
import { Character } from '@app/store/slices/characterSlice/types';
import unionBy from 'lodash/unionBy';
import { QUERY_STALE_TIME } from '../constants';

export const CharacterList: React.FC = () => {
  const { currentPage, search, editedById } = useAppSelector((state) => state.character);
  const [total, setTotal] = useState(0);

  const [debouncedSearch] = useDebounce(search, 500, { leading: true });

  const hasSearch = useMemo(() => debouncedSearch.trim().length > 0, [debouncedSearch]);

  const { data, isLoading } = useQuery(
    ['characters', currentPage, debouncedSearch],
    () => getCharacters(currentPage, debouncedSearch),
    { staleTime: QUERY_STALE_TIME },
  );

  useEffect(() => {
    if (data && !hasSearch) {
      setTotal(data.count);
    }
  }, [data, hasSearch]);

  const filterLocalResults = (searchText: string, data: Record<number, Character>) => {
    const lowercasedSearch = searchText.toLowerCase();
    return Object.values(data).filter((item) => item.name.toLowerCase().includes(lowercasedSearch));
  };

  const characters = useMemo(() => {
    let loadedCharacters = data?.results.map(createCharacter).map((c) => editedById[c.id] || c) ?? [];
    let localResults: Character[] = [];

    if (hasSearch) {
      loadedCharacters = loadedCharacters.filter((x) => !editedById[x.id]);
      localResults = filterLocalResults(debouncedSearch, editedById);
    }

    const combinedResults = unionBy(localResults, loadedCharacters, 'id');
    return combinedResults;
  }, [data, editedById, debouncedSearch, hasSearch]);

  let content: React.ReactNode;
  if (characters.length > 0) {
    content = characters.map((character) => (
      <Col key={character.url} span={24}>
        <CharacterCard character={character} />
      </Col>
    ));
  } else if (isLoading) {
    content = <CardLoading />;
  } else {
    content = <S.EmptyList image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <Col>
      <S.Header justify={'space-between'} align={'middle'} wrap={false}>
        <CharacterSearch loading={isLoading} />
        {!hasSearch && <CharacterPagination total={total} />}
      </S.Header>
      <Row gutter={isLoading ? undefined : 16} justify={'center'}>
        {content}
      </Row>
    </Col>
  );
};
