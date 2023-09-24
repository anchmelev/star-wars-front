import { menuSlice } from './menuSlice';
import { swCharacterSelectors } from './swCharacterSlice/swCharacterSelectors';
import { swCharacterSlice } from './swCharacterSlice/swCharacterSlice';

export const rootReducer = {
  menu: menuSlice.reducer,
  swCharacter: swCharacterSlice.reducer,
};

export const actions = {
  menu: menuSlice.actions,
  swCharacter: swCharacterSlice.actions,
};

export const selectors = {
  swCharacter: swCharacterSelectors,
};
