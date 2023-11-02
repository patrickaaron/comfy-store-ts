import { Link, redirect } from "react-router-dom";
import { Store } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { RootState } from "../store";
import { useAppSelector } from "../hooks/redux-store";

import { CartTotals } from "../components/CartTotals";
import { SectionTitle } from "../components/SectionTitle";
import { CheckoutForm } from "../components/CheckoutForm";

export const loader = (store: Store<RootState>) => async () => {
  const { user } = store.getState().user;

  if (!user) {
    toast("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

export default function Checkout() {
  const { items } = useAppSelector((state) => state.cart);

  return (
    <>
      <SectionTitle title="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        {Object.keys(items).length === 0 ? (
          <div className="pb-5">
            <h2 className="text-2xl font-medium">Your cart is empty</h2>
            <Link to="/products" className="mt-6 btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <CheckoutForm />
        )}

        <CartTotals />
      </div>
    </>
  );
}
