import { apiSlice } from "../../api/api";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersById: builder.query({
      query: (credentials) => ({
        url: "/orders",
        method: "GET",
        body: credentials,
      }),
      invalidatesTags: ["Order"],
    }),
    completeOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersByIdQuery, useCompleteOrderMutation } = orderApi;
