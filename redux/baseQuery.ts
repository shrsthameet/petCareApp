import { API_BASE_URL, OIDC_STORAGE_KEY } from 'utils/appConfig';
import { getFromStorage } from 'utils/localStorage';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const data = getFromStorage(OIDC_STORAGE_KEY);
    const user: any = data;

    // for time being we are requesting api with emailId
    headers.set('Authorization', ${user.token_type} ${user.access_token});
    headers.set('Content-Type', 'text/plain');
    headers.set('Accept', 'text/plain');
    headers.set('email', 'bipin@norbrik.com');
    headers.set('teamId', '7a1eeaee-04fb-4689-a3c4-1bdd01d0fdba');
    return headers;
  },
});