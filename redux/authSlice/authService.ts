import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponseType, User, UserLoginCredentials } from '@/utils/types';
import { returnErroMsg } from '@/utils/types/appUtils';
import { BASE_URL, ROUTES } from '@/utils/types/routesType';

export const login = createAsyncThunk<ApiResponseType<User>, UserLoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<ApiResponseType<User>>(
        `${BASE_URL}${ROUTES.AUTH.LOGIN}`,
        credentials
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return returnErroMsg(error, rejectWithValue);
    }
  }
);

export const logout = createAsyncThunk<ApiResponseType<null>>('auth/logout', async(_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponseType<null>>(`${BASE_URL}${ROUTES.AUTH.LOGOUT}`);
    const result = await response.data;
    if (result.success) {
      await AsyncStorage.clear();
    }
    return result;
  } catch (error) {
    return returnErroMsg(error, rejectWithValue);
  }
});