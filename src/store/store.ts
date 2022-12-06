import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.slice";
import { kitchenApi } from "./kitchenApi/kitchen.api";

export const store = configureStore({
    reducer: {
        [kitchenApi.reducerPath]: kitchenApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(kitchenApi.middleware),
});

export type TypedRootSelector = ReturnType<typeof store.getState>