import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../authSlice';
import themeSlice from '../themeSlice';
import { authApi } from '../authSlice/authApi';
import { petsApi } from '../petSlice/petsApi';
import { userPetProfileApi } from '../uersPetProfileSlice/userPetProfileApi';
import { petProfileApi } from '../petProfileSlice/petProfileApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  [authApi.reducerPath]: authApi.reducer,
  [petsApi.reducerPath]: petsApi.reducer,
  [userPetProfileApi.reducerPath]: userPetProfileApi.reducer,
  [petProfileApi.reducerPath]: petProfileApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;