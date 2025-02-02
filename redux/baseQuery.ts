

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/utils/types/routesType';
import { getToken } from '@/utils/types/appUtils';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();

    // for time being we are requesting api with emailId
    // headers.set('Authorization', ${user.token_type} ${user.access_token});
    // headers.set('Content-Type', 'text/plain');
    headers.set('Accept', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});