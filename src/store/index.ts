import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { kitchenApi } from "./kitchenApi/kitchen.api";

export const store = configureStore({
    reducer: {
        [kitchenApi.reducerPath]: kitchenApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kitchenApi.middleware)
})