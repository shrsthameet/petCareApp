import { combineReducers } from '@reduxjs/toolkit';
import testSlice from '../testSlice';
import authSlice from '../authSlice';
import themeSlice from '../themeSlice';
import { authApi } from '../authSlice/authApi';

export const rootReducer = combineReducers({
  test: testSlice,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice,
  theme: themeSlice
});

export type RootState = ReturnType<typeof rootReducer>;