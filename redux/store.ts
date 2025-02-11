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
import { petProfileApi } from './petProfileSlice/petProfileApi';

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the store
// Uncomment it when implementing redux persist
const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(
    authApi.middleware,
    petsApi.middleware,
    userPetProfileApi.middleware,
    petProfileApi.middleware
  ),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

const persistor = persistStore(store);

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false,
//     getDefaultMiddleware().concat(authApi.middleware)
//   })
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// });


// Define RootState and AppDispatch types based on the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  store,
  persistor
};