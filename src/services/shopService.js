import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../database/realtimeDB';

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = shopApi;
