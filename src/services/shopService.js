import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../database/realtimeDB';

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalsTo="${category}"`,
    }),
    getProductById: builder.query({
      query: (productId) => `products.json?orderBy="id"&equalsTo=${productId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = shopApi;
