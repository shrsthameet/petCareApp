import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { APIMethod } from '@/utils/enum';

// Authentication API Slice
export const userPetProfileApi = createApi({
  reducerPath: 'userPetProfileApi',
  baseQuery,
  endpoints: (builder) => ({
    getUserPetProfiles: builder.query({
      query: (userId) => {
        return (
          {
            url: `/users/${userId}/pets`
          }
        );
      }
    }),
    createUserPetProfiles: builder.mutation({
      query: (petProfileData) => {
        return (
          {
            url: API_ROUTES.PET.PROFILE,
            method: APIMethod.POST,
            body: petProfileData,
          }
        );
      },
    }),
  }),
});

export const { useGetUserPetProfilesQuery, useCreateUserPetProfilesMutation } = userPetProfileApi;