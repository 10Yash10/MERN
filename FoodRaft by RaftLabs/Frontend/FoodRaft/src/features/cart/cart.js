import { apiSlice } from "../../api/api";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    getBill: builder.query({
      query: () => "/getBill",
      providesTags: ["Cart"],
    }),
    addUpdateToCart: builder.mutation({
      query: (credentials) => ({
        url: "/cart",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (credentials) => ({
        url: "/cart",
        method: "DELETE",
        body: credentials,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCartById: builder.mutation({
      query: (credentials) => ({
        url: "/cart/all",
        method: "DELETE",
        body: credentials,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetBillQuery,
  useAddUpdateToCartMutation,
  useRemoveFromCartMutation,
  useClearCartByIdMutation,
} = cartApi;
