import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      providesTags: ["product"],
      query: (id) => `admin-products?id=${id}`,
    }),
    categories: builder.query<CategoriesResponse, string>({
      providesTags: ["product"],
      query: () => "categories",
    }),
    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, page, category }) => {
        let baseQuery = `all?search=${search}&page=${page}`;
        if (price) baseQuery += `&price=${price}`;
        if (category) baseQuery += `&category=${category}`;
        if (sort) baseQuery += `&sort=${sort}`;
        return baseQuery;
      },
      providesTags: ["product"],
    }),
    // api to create the product
    createProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    // api to get single product
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    // api to update the product
    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ userId, productId, formData }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    // api to delete the product
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
