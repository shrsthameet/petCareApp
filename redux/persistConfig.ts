import AsyncStorage from '@react-native-async-storage/async-storage';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['auth'], // Only persist specific reducers if needed
  whitelist: [], // Only persist specific reducers if needed
};

export default persistConfig;
