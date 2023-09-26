import React, { useLayoutEffect } from 'react';
import { PageTitle } from '@app/components/PageTitle/PageTitle';
import { CharacterDetails } from '@app/components/Character/CharacterDetails/CharacterDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@app/router/Page';
import { useSearchParams } from '@app/hooks/useSearchParams';

const EDIT_QUERY_PARAM = 'edit';

const CharacterDetailsPage: React.FC = () => {
  const { id: idString } = useParams<{ id: string }>();
  const characterId = Number(idString);
  const navigate = useNavigate();

  const query = useSearchParams();
  const isEditing = query.has(EDIT_QUERY_PARAM);

  useLayoutEffect(() => {
    if (isNaN(characterId)) {
      navigate(Page.error404, { replace: true });
    }
  }, [characterId, navigate]);

  const toggleEdit = () => {
    if (isEditing) {
      navigate(``);
    } else {
      navigate(`?${EDIT_QUERY_PARAM}`);
    }
  };

  return (
    <>
      <PageTitle>Character Profile</PageTitle>
      {!isNaN(characterId) && (
        <CharacterDetails characterId={characterId} isEditing={isEditing} toggleEdit={toggleEdit} />
      )}
    </>
  );
};

export default CharacterDetailsPage;
