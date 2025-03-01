import { authApi } from './authSlice/authApi';
import { petsApi } from './petSlice/petsApi';
import { userPetProfileApi } from './uersPetProfileSlice/userPetProfileApi';
import { petHealthRecordsApi } from './petHealthRecordSlice/petHealthRecordsApi';
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
    petHealthRecordsApi.reducerPath,
  ],
};

export default persistConfig;