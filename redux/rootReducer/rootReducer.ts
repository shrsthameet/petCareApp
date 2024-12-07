import { combineReducers } from '@reduxjs/toolkit';
import testSlice from '../testSlice';
import authSlice from '../authSlice';
import themeSlice from '../themeSlice';

export const rootReducer = combineReducers({
  test: testSlice,
  auth: authSlice,
  theme: themeSlice
});

export type RootState = ReturnType<typeof rootReducer>;