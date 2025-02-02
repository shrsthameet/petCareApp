import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

// Create MMKV instance
const storage = new MMKV();

// Define storage methods
const mmkvStorage: Storage = {
  getItem: (key: string): Promise<string | undefined> => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  setItem: (key: string, value: string): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default mmkvStorage;

// Define types for the custom storage
export interface ReduxPersistStorage {
  getItem: (key: string) => Promise<string | undefined>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}
