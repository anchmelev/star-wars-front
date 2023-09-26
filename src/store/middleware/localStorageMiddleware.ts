import { Middleware } from '@reduxjs/toolkit';
import { actions } from '../slices/rootReducer';
import type { RootState } from '../store';
import { EDITED_CHARACTERS_LS_KEY } from '../slices/characterSlice/constants';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  let result = next(action);

  if (action.type === actions.character.updateCharacter.type || action.type === actions.character.resetCharacter.type) {
    const state = store.getState() as RootState;
    const editedById = state.character.editedById;
    try {
      localStorage.setItem(EDITED_CHARACTERS_LS_KEY, JSON.stringify(editedById));
    } catch (error) {
      console.error(error);
    }
  }

  return result;
};
