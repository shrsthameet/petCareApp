import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { PetType } from '@/utils/types/petType';
import { PetBreed } from '@/utils/types/petBreedsType';

// Authentication API Slice
export const petsApi = createApi({
  reducerPath: 'petsApi',
  baseQuery,
  tagTypes: ['AllPetTypes'],
  endpoints: (builder) => ({
    getAllPetTypes: builder.query({
      query: () => ({
        url: API_ROUTES.PET.TYPE,
      }),
      transformResponse: (response: { data: PetType[] }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
    }),
    getAllPetBreeds: builder.query({
      query: () => ({
        url: API_ROUTES.PET.BREED,
      }),
      transformResponse: (response: { data: PetBreed[] }) => response.data,
    }),
  }),
});

export const {
  useGetAllPetTypesQuery,
  useGetAllPetBreedsQuery
} = petsApi;