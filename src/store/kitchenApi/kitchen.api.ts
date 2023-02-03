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
        baseUrl: "http://localhost:81/",
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
                url: `api/products/${category}/${subcategory}/${product}/`,
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
        getRandomProducts: build.query<IProduct[], void>({
            query: () => ({
                url: "api/products/random-products/",
            }),
        }),
        genXLSX: build.mutation<any, any>({
            query: (body) => ({
                url: "docs-gen/xlsx-generator/",
                method: "POST",
                body,
                responseHandler: async (response) => {
                    response.blob().then((blob) => {
                        const current = new Date();
                        const date = `${current.getDate()}.${
                            current.getMonth() + 1
                        }.${current.getFullYear()}_${current.getHours()}.${current.getMinutes()}`;

                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = `KP_${date}.xlsx`;
                        a.click();
                    });
                },
                cache: "no-cache",
                overrideExisting: false,
            }),
        }),
        genPDF: build.mutation<any, any>({
            query: (body) => ({
                url: "docs-gen/pdf-generator/",
                method: "POST",
                body,
                responseHandler: async (response) => {
                    response.blob().then((blob) => {
                        const current = new Date();
                        const date = `${current.getDate()}.${
                            current.getMonth() + 1
                        }.${current.getFullYear()}_${current.getHours()}.${current.getMinutes()}`;
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = `KP_${date}.pdf`;
                        a.click();
                    });
                },
                cache: "no-cache",
                overrideExisting: false,
            }),
        }),
        getSlideImages: build.query<any, void>({
            query: () => ({
                url: "other-app/slideImg/",
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSubCategoriesQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useGetRandomProductsQuery,
    useSearchProductMutation,
    useGetSlideImagesQuery,
    useGenXLSXMutation,
    useGenPDFMutation,
} = kitchenApi;
