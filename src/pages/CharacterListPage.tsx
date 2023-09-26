import React from 'react';
import { PageTitle } from '@app/components/PageTitle/PageTitle';
import { CharacterList } from '@app/components/Character/CharacterList/CharacterList';

const CharacterListPage: React.FC = () => {
  return (
    <>
      <PageTitle>List of characters</PageTitle>
      <CharacterList />
    </>
  );
};

export default CharacterListPage;
