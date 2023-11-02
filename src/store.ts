import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart/cartSlice";
import { userSlice } from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
