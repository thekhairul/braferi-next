import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setProductFilters } = productSlice.actions;

export default productSlice.reducer;
