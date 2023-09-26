import { CharacterDto } from '@app/api/character.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, CharacterLink, CharacterState } from './types';
import { EDITED_CHARACTERS_LS_KEY } from './constants';

let editedById: Record<number, Character> = {};

try {
  const val = localStorage.getItem(EDITED_CHARACTERS_LS_KEY);
  if (val) editedById = JSON.parse(val);
} catch (error) {
  console.error(error);
}

const initialState: CharacterState = {
  linksByUrl: {},
  editedById,
  search: '',
  currentPage: 1,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    updateCharacter: (state, action: PayloadAction<Character>) => {
      const id = action.payload.id;
      state.editedById[id] = action.payload;
    },

    resetCharacter: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      delete state.editedById[id];
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    putLinks: (state, action: PayloadAction<CharacterLink[]>) => {
      action.payload.forEach((link) => {
        state.linksByUrl[link.url] = link;
      });
    },

    clearLinks: (state) => {
      state.linksByUrl = {};
    },
  },
});

export function createCharacter(dto: CharacterDto): Character {
  const id = dto.url.split('/').filter(Boolean).pop();
  return { ...dto, id: Number(id) };
}
