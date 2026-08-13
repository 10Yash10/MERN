import { apiSlice } from "../../api/api";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "/menu",
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;
