import { characterSlice } from './characterSlice/characterSlice';

export const rootReducer = {
  character: characterSlice.reducer,
};

export const actions = {
  character: characterSlice.actions,
};
