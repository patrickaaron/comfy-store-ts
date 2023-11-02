import { CartItem } from "@/src/types/db";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type CartState = {
  items: Record<string, CartItem>;
  numItems: number;
  cartTotal: number;
  shippingFee: number;
  taxFee: number;
  orderTotal: number;
};

const initialState: CartState = {
  items: {},
  numItems: 0,
  cartTotal: 0,
  shippingFee: 500,
  taxFee: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? (JSON.parse(cartData) as CartState) : initialState;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ key: string; item: CartItem }>
    ) => {
      const { key, item } = action.payload;

      if (key in state.items) {
        state.items[key].amount += item.amount;
      } else {
        state.items[key] = item;
      }

      state.numItems += item.amount;
      state.cartTotal += item.price * item.amount;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      /* You should not directly assign a new object to the state parameter */
      // state = { ...initialState }; **will not work
      return { ...initialState };
    },
    removeItem: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload;
      // Duplicate cart items and delete the property with itemId
      const cartItems = { ...state.items };
      const { amount, price } = cartItems[itemId];
      delete cartItems[itemId];
      // Destructure the updated object and calculate new totals
      state.items = { ...cartItems };
      state.numItems -= amount;
      state.cartTotal -= price * amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    editItem: (
      state,
      action: PayloadAction<{ itemId: string; amount: number }>
    ) => {
      const { itemId, amount } = action.payload;
      const cartItem = state.items[itemId];
      state.numItems += amount - cartItem.amount;
      state.cartTotal += cartItem.price * (amount - cartItem.amount);
      cartItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.taxFee = 0.06625 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shippingFee + state.taxFee;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

/* Action Creators */
export const { addItem, clearCart, removeItem, editItem, calculateTotals } =
  cartSlice.actions;
