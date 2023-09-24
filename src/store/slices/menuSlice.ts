import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MenuState {
  siderCollapsed: boolean;
}

const initialState: MenuState = {
  siderCollapsed: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSiderCollapsed: (state, action: PayloadAction<MenuState>) => {
      state.siderCollapsed = action.payload.siderCollapsed;
    },
  },
});
