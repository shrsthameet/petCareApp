import { authApi } from './authSlice/authApi';
import { petProfileApi } from './petProfileSlice/petProfileApi';
import { petsApi } from './petSlice/petsApi';
import { userPetProfileApi } from './uersPetProfileSlice/userPetProfileApi';
import mmkvStorage from '@/utils/mmkvStorage';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: ['auth'], // Only persist specific reducers if needed
  // whitelist: [], // Only persist specific reducers if needed
  blacklist: [
    authApi.reducerPath,
    petsApi.reducerPath,
    userPetProfileApi.reducerPath,
    petProfileApi.reducerPath
  ],
};

export default persistConfig;