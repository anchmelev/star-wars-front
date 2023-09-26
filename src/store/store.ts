import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@app/store/slices/rootReducer';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
