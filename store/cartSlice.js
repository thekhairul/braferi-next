import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({
    products: []
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState(),
    reducers: {
        addToCart(state, action) {
            if (products.find(product => product.id === action.payload.id)) return;
            state.products.push(action.payload)
        },
        removeFromCart(state, action) {
            const toRemoveIndex = state.products.findIndex(product => product.id === action.payload.id);
            if (toRemoveIndex >= 0) state.products.splice(toRemoveIndex, 1);
        },
        updateCartItem(state, action) {
            const productIndex = state.products.findIndex((product) => product.id === action.payload.id);
            const product = productIndex >= 0 ? state.products[productIndex] : null;
            if (product) state.products[productIndex] = {...product, ...action.payload.value}
        }
    }
})