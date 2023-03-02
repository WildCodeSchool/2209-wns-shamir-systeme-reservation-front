import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProductCart from "../../interfaces/IProductCart";

export interface CartState {
  cart: IProductCart[],
}

const initialState: CartState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IProductCart[]>) => {
      state.cart = action.payload;
    },
    reset: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setCart, reset } = cartSlice.actions;

export default cartSlice.reducer;
