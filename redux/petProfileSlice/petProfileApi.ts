import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { PetProfile } from '@/utils/types/petProfile';

// petProfile API Slice
export const petProfileApi = createApi({
  reducerPath: 'petProfileApi',
  baseQuery,
  tagTypes: ['petProfile'],
  endpoints: (builder) => ({
    getPetProfileById: builder.query({
      query: (petProfileId) => ({
        url: `${API_ROUTES.PET.PROFILE}/${petProfileId}`
      }),
      transformResponse: (response: { data: PetProfile }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
    }),
  }),
});

export const { useGetPetProfileByIdQuery } = petProfileApi;