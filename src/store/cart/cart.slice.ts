import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/models";

type CartType = {
    cart: IProduct[];
};

const initialState: CartType = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const itemInCart = state.cart.find(
                (item) => item.id === action.payload.id
            );

            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action: PayloadAction<IProduct>) => {
            const item = state.cart.find(
                (item) => item.id === action.payload.id
            );
            item!.quantity++;
        },
        decrementQuantity: (state, action: PayloadAction<IProduct>) => {
            const item = state.cart.find(
                (item) => item.id === action.payload.id
            );
            if (item!.quantity === 1) {
                item!.quantity = 1;
            } else {
                item!.quantity--;
            }
        },
        removeProduct: (state, action: PayloadAction<IProduct>) => {
            const removeItem = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            state.cart = removeItem;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
