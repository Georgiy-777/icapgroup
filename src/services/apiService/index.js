import { createApi } from '@reduxjs/toolkit/query/react';

export const icapgroupApi = createApi({
  reducerPath: 'icapgroup',
  tagTypes: [
    'auth',
    'table'
  ],
  endpoints: (builder) => ({}),
});
