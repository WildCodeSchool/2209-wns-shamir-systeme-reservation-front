import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../interfaces/IUser";

export interface UserState{
  user: IUser;
  token: string;
  isAdmin: boolean;
}

const initialState: UserState = {
  user: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
  token: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user.id = action.payload.id;
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
    },
    reset: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setIsAdmin, setUser, reset } = userSlice.actions;

export default userSlice.reducer;
