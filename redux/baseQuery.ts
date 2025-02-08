import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/utils/types/routesType';
import { getToken } from '@/utils/types/appUtils';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, api) => {
    const token = getToken();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// // Check if the body is FormData (for multipart form data)
// const isFormData = api.arg && typeof api.arg !== 'string' && api.arg.body instanceof FormData;

// // If the body is FormData, we don't set Content-Type manually
// if (isFormData) {
//   // Don't set Content-Type for FormData (React Native/Browser will handle it)
// } else {
//   // Set Content-Type for JSON requests
//   headers.set('Content-Type', 'application/json');
// }