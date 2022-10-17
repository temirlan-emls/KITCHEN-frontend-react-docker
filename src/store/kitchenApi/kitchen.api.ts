import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CategoriesResponse,
    CategoryResponse,
    SubCategoryResponse,
    IProduct,
} from "../../models/models";

export const kitchenApi = createApi({
    reducerPath: "kitchen/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/",
    }),
    endpoints: (build) => ({
        getCategories: build.query<CategoriesResponse[], void>({
            query: () => ({
                url: "api/products/categories/",
            }),
        }),
        getSubCategories: build.query<CategoryResponse, string>({
            query: (category: string) => ({
                url: `api/products/${category}/`,
            }),
        }),
        getProducts: build.query<
            SubCategoryResponse,
            { category: string; subcategory: string }
        >({
            query: ({ category, subcategory }) => ({
                url: `api/products/${category}/${subcategory}/`,
            }),
        }),
        getProduct: build.query<
            IProduct,
            { category: string; subcategory: string; product: string }
        >({
            query: ({ category, subcategory, product }) => ({
                url: `api/product/${category}/${subcategory}/${product}/`,
            }),
        }),
        searchProduct: build.mutation<IProduct[], string>({
            query: (query) => ({
                url: `api/products/search/`,
                method: "POST",
                body: query,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSubCategoriesQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useSearchProductMutation
} = kitchenApi;
