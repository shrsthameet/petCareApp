import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { authApi } from './authSlice/authApi';
import { rootReducer } from './rootReducer';
import persistConfig from './persistConfig';
import { petsApi } from './petSlice/petsApi';
import { userPetProfileApi } from './uersPetProfileSlice/userPetProfileApi';
import { petHealthRecordsApi } from './petHealthRecordSlice/petHealthRecordsApi';

// Persisted reducer for redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      petsApi.middleware,
      userPetProfileApi.middleware,
      petHealthRecordsApi.middleware
    ),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

// Persistor for redux-persist
const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  store, persistor 
};
