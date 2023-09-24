import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SWCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

type SWCharacterState = {
  byId: Record<string, SWCharacter>;
};

const initialState: SWCharacterState = {
  byId: {},
};

export const swCharacterSlice = createSlice({
  name: 'swCharacterSlice',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<SWCharacter>) => {
      const id = action.payload.url;
      state.byId[id] = action.payload;
    },

    removeCharacter: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
    },

    updateCharacter: (state, action: PayloadAction<SWCharacter>) => {
      const id = action.payload.url;
      state.byId[id] = action.payload;
    },
  },
});
