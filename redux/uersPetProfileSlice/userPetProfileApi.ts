import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { APIMethod } from '@/utils/enum';
import { UserPetProfile } from '@/utils/types';

// userPetProfile API Slice
export const userPetProfileApi = createApi({
  reducerPath: 'userPetProfileApi',
  baseQuery,
  tagTypes: ['userPetProfiles'],
  endpoints: (builder) => ({
    getUserPetProfiles: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/pets`
      }),
      transformResponse: (response: { data: UserPetProfile[] }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
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
      invalidatesTags: ['userPetProfiles']
    }),
  }),
});

export const { useGetUserPetProfilesQuery, useCreateUserPetProfilesMutation } = userPetProfileApi;