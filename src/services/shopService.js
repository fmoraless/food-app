import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../database/realtimeDB';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['profileImageGet', 'Orders'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
    getProducts: builder.query({
      query: () => `productos.json`,
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `productos.json?orderBy="category"&equalsTo="${category}"`,
      transformResponse: (response) => {
        //console.log({ resFromService: response });
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    getProductById: builder.query({
      query: (productId) => `productos.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        if (responseTransformed.length) return responseTransformed[0];
        return responseTransformed;
      },
    }),
    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: 'orders.json',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query({
      query: () => `orders.json`,
      providesTags: ['Orders'],
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ['profileImageGet'],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: 'PUT',
        body: {
          image: image,
        },
      }),
      invalidatesTags: ['profileImageGet'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  usePostOrderMutation,
  useGetOrdersQuery,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} = shopApi;
