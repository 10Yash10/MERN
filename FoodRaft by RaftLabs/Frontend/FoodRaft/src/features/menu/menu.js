import { apiSlice } from "../../api/api";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => "/menu",
      providesTags: ["Menu"],
    }),
    getMenuItemById: builder.query({
      query: (credentials) => ({
        url: `/menu/${credentials}`,
      }),
      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenuQuery, useGetMenuItemByIdQuery } = menuApi;
