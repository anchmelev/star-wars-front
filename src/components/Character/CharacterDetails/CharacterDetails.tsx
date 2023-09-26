import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHooks';
import { Loading } from '@app/components/Loading/Loading';
import { Link } from 'react-router-dom';
import { Page } from '@app/router/Page';
import { CharacterEdit } from './CharacterEdit/CharacterEdit';
import { CharacterView } from './CharacterView/CharacterView';
import { useQuery } from 'react-query';
import { getCharacter } from '@app/api/character.api';
import { createCharacter } from '@app/store/slices/characterSlice/characterSlice';
import { useCharacterLinkQueries } from './hooks/useCharacterLinksQuery';
import { QUERY_STALE_TIME } from './constants';
import { actions } from '@app/store/slices/rootReducer';

interface CharacterDetailsProps {
  characterId: number;
  isEditing: boolean;
  toggleEdit: () => void;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId, isEditing, toggleEdit }) => {
  const { editedById } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  const characterQ = useQuery(
    ['character', characterId, editedById],
    () => editedById[characterId] || getCharacter(characterId).then(createCharacter),
    { staleTime: QUERY_STALE_TIME },
  );

  const queries = useCharacterLinkQueries(characterQ.data);

  useEffect(() => {
    return () => {
      dispatch(actions.character.clearLinks());
    };
  }, []);

  if (characterQ.error) {
    const errorMsg = (characterQ.error as Error)?.message ?? '';
    return (
      <Result
        status="warning"
        title={errorMsg}
        extra={
          <Link to={Page.home}>
            <Button type="primary" key="console">
              Go Home
            </Button>
          </Link>
        }
      />
    );
  }

  if (characterQ.isLoading || !characterQ.data) {
    return <Loading fixed />;
  }

  return isEditing ? (
    <CharacterEdit queries={queries} character={characterQ.data} toggleEdit={toggleEdit} />
  ) : (
    <CharacterView
      queries={queries}
      edited={!!editedById[characterId]}
      character={characterQ.data}
      toggleEdit={toggleEdit}
    />
  );
};
