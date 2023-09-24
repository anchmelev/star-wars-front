import type { RootState } from '@app/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCharactersState = (state: RootState) => state.swCharacter.byId;

export const selectSortedCharacters = createSelector([selectCharactersState], (charactersById) => {
  return Object.values(charactersById).sort((a, b) => {
    return new Date(b.edited).getTime() - new Date(a.edited).getTime();
  });
});

export const swCharacterSelectors = {
  selectCharactersState,
  selectSortedCharacters,
};
