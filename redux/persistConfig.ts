import { PersistConfig } from 'redux-persist';
import mmkvStorage from '@/utils/mmkvStorage';

// Config for redux-persist
const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: mmkvStorage,
  // whitelist: ['auth'], // Only persist specific reducers if needed
  whitelist: [], // Only persist specific reducers if needed
};

export default persistConfig;