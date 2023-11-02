import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/src/types/db";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? { user: JSON.parse(userData) as User } : initialState;
};

export const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage(),
  reducers: {
    loginUser: (state, action: PayloadAction<{ user: User; jwt: string }>) => {
      const { user, jwt } = action.payload;
      state.user = { ...user, token: jwt };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

/* Action Creators */
export const { loginUser, logoutUser } = userSlice.actions;
