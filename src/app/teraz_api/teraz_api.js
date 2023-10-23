import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const terazApi = createApi({
  reducerPath: "terazApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
