import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer } from './rootReducer';
// import persistConfig from './persistConfig';

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the store
// Uncomment it when implementing redux persist
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false 
//   })
// });

// const persistor = persistStore(store);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false 
  })
});


// Define RootState and AppDispatch types based on the store itself
export type AppDispatch = typeof store.dispatch;

export {
  store,
  // Uncomment it when implementing redux persist
  // persistor
};