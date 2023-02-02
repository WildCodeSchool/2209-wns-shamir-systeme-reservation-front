import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";

export interface ProductsState {
  products: IProduct[],
  categories: ICategory[],
  productsByDate: IProduct[],
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  productsByDate: [],
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setProductsByDate: (state, action: PayloadAction<IProduct[]>) => {
      state.productsByDate = action.payload;
    },
    resetProductsByDate: (state) => {
      state.productsByDate = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setCategories, setProductsByDate, resetProductsByDate } = productsSlice.actions;

export default productsSlice.reducer;
