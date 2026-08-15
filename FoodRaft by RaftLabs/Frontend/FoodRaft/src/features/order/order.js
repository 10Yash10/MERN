import { apiSlice } from "../../api/api";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersById: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    getOrderStatusNotification: builder.query({
      query: () => "/status-notification",
      providesTags: ["Order"],
    }),
    completeOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Order"],
    }),
    cancelOrder: builder.mutation({
      query: (credentials) => ({
        url: "/cancel-order",
        method: "DELETE",
        body: credentials,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersByIdQuery,
  useGetOrderStatusNotificationQuery,
  useCompleteOrderMutation,
  useCancelOrderMutation,
} = orderApi;
