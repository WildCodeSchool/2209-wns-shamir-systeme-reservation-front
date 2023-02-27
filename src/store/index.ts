import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import productsReducer from "./features/productsSlice"
import cartReducer from "./features/cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>