import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.slice";
import { kitchenApi } from "./kitchenApi/kitchen.api";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    [kitchenApi.reducerPath]: kitchenApi.reducer,
    cart: cartReducer,
});

const persistConfig = {
    key: "root",
    blacklist: [kitchenApi.reducerPath],
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(kitchenApi.middleware),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
