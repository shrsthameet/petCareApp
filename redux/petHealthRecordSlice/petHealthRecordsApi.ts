import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { API_ROUTES } from '@/utils/types/routesType';
import { APIMethod } from '@/utils/enum';

// petHealthRecords API Slice
export const petHealthRecordsApi = createApi({
  reducerPath: 'petHealthRecordsApi',
  baseQuery,
  tagTypes: ['AllPetHealthRecord', 'PetHealthRecordById'],
  endpoints: (builder) => ({
    getAllPetHealthRecord: builder.query({
      query: (petProfileId) => ({
        url: `${API_ROUTES.PET.PROFILE}/${petProfileId}/healthRecords`
      }),
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
      providesTags: ['AllPetHealthRecord'],
    }),
    createPetHealthRecord: builder.mutation({
      query: ({ petProfileId, petHealthRecordData }) => {
        return (
          {
            url: `${API_ROUTES.PET.PROFILE}/${petProfileId}/healthRecords`,
            method: APIMethod.POST,
            body: petHealthRecordData,
          }
        );
      },
      invalidatesTags: []
    }),
    getPetHealthRecordById: builder.query({
      query: ({ petProfileId, petHealthRecordId }) => ({
        url: `${API_ROUTES.PET.PROFILE}/${petProfileId}/healthRecords/${petHealthRecordId}`
      }),
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: (
        response,
      ) => response,
      providesTags: ['PetHealthRecordById'],
    }),
    updatePetHealthRecord: builder.mutation({
      query: ({ petProfileId, petHealthRecordId, petHealthRecordData }) => {
        return (
          {
            url: `${API_ROUTES.PET.PROFILE}/${petProfileId}/healthRecords/${petHealthRecordId}`,
            method: APIMethod.PATCH,
            body: petHealthRecordData,
          }
        );
      },
      invalidatesTags: ['PetHealthRecordById']
    }),
    deletePetHealthRecord: builder.mutation({
      query: ({ petProfileId, petHealthRecordId }) => {
        return (
          {
            url: `${API_ROUTES.PET.PROFILE}/${petProfileId}/healthRecords/${petHealthRecordId}`,
            method: APIMethod.DELETE,
          }
        );
      },
      invalidatesTags: []
    }),
  }),
});

export const {
  useGetAllPetHealthRecordQuery,
  useGetPetHealthRecordByIdQuery,
  useCreatePetHealthRecordMutation,
  useDeletePetHealthRecordMutation,
  useUpdatePetHealthRecordMutation
} = petHealthRecordsApi;