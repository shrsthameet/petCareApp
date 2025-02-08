import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES, BASE_URL } from '@/utils/types/routesType';
import { APIMethod } from '@/utils/enum';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Base Query with Authorization Header
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: async (headers) => {
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Authentication API Slice
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        console.log('credentials', credentials);
        return (
          {
            url: API_ROUTES.AUTH.LOGIN,
            method: APIMethod.POST,
            body: credentials,
          }
        );
      },
    }),
    register: builder.mutation({
      query: (userData) => {
        return (
          {
            url: API_ROUTES.AUTH.REGISTER,
            method: APIMethod.POST,
            body: userData,
          }
        );
      },
    }),
    // logout: builder.query({
    //   query: () =>({
    //     url: API_ROUTES.AUTH.REGISTER,
    //     method: APIMethod.GET,
    //   }),
    //   transformResponse: (response: { success: boolean }) => response.success,
    //   transformErrorResponse: (
    //     response,
    //   ) => response,
    // }),
    logout: builder.mutation({
      query: () => ({
        url: API_ROUTES.AUTH.LOGOUT,
        method: APIMethod.POST,
      })
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;