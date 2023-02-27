import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";

export interface ProductsState {
  products: IProduct[];
  categories: ICategory[];
  productsByDate: IProduct[];
  filter: {
    categories: ICategory[];
    term: string;
    period: {
      dateFrom: string;
      dateTo: string;
    };
  };
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  productsByDate: [],
  filter: {
    categories: [],
    term: "",
    period: {
      dateFrom: "",
      dateTo: "",
    },
  },
};

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
    setFilterCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.filter.categories = action.payload;
    },
    setFilterTerm: (state, action: PayloadAction<string>) => {
      state.filter.term = action.payload;
    },
    setFilterPeriod: (state, action: PayloadAction<{dateFrom: string, dateTo: string}>) => {
      state.filter.period.dateFrom = action.payload.dateFrom;
      state.filter.period.dateTo = action.payload.dateTo;
    },
    resetFilter: (state) => {
      state.filter = {
        categories: [],
        term: "",
        period: {
          dateFrom: "",
          dateTo: "",
        },
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setCategories,
  setProductsByDate,
  resetProductsByDate,
  setFilterCategories,
  setFilterTerm,
  setFilterPeriod,
  resetFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
