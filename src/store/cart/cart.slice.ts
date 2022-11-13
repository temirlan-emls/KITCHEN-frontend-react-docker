import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/models";



const initialState: IProduct[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IProduct>) => {
            state.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<{ id: number }>) => {
            const indexOfObject = state.findIndex((object) => {
                return object.id === action.payload.id;
            });
            state.splice(indexOfObject, 1);
            return state;
        },

    },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
