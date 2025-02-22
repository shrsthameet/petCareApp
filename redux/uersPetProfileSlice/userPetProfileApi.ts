import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { APIMethod } from '@/utils/enum';
import { PetProfile, UserPetProfile } from '@/utils/types/petProfile';

// userPetProfile API Slice
export const userPetProfileApi = createApi({
  reducerPath: 'userPetProfileApi',
  baseQuery,
  tagTypes: ['UserPetProfiles', 'PetProfile'],
  endpoints: (builder) => ({
    getUserPetProfiles: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/pets`
      }),
      transformResponse: (response: { data: UserPetProfile[] }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
      providesTags: ['UserPetProfiles'],
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
      invalidatesTags: ['UserPetProfiles']
    }),
    getPetProfileById: builder.query({
      query: (petProfileId) => ({
        url: `${API_ROUTES.PET.PROFILE}/${petProfileId}`
      }),
      transformResponse: (response: { data: PetProfile }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
      providesTags: ['PetProfile'],
    }),
    updateUserPetProfile: builder.mutation({
      query: ({ petProfileId, petProfileData }) => {
        return (
          {
            url: `${API_ROUTES.PET.PROFILE}/${petProfileId}`,
            method: APIMethod.PATCH,
            body: petProfileData,
          }
        );
      },
      invalidatesTags: ['PetProfile']
    }),
    deleteUserPetProfile: builder.mutation({
      query: (petProfileId) => {
        return (
          {
            url: `${API_ROUTES.PET.PROFILE}/${petProfileId}`,
            method: APIMethod.DELETE,
          }
        );
      },
      invalidatesTags: ['UserPetProfiles', 'PetProfile']
    }),
  }),
});

export const {
  useGetUserPetProfilesQuery,
  useCreateUserPetProfilesMutation,
  useUpdateUserPetProfileMutation,
  useGetPetProfileByIdQuery,
  useDeleteUserPetProfileMutation
} = userPetProfileApi;