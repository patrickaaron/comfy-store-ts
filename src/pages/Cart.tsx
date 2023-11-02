import { Link } from "react-router-dom";

import { useAppSelector } from "../hooks/redux-store";

import { SectionTitle } from "../components/SectionTitle";
import { CartTotals } from "../components/CartTotals";
import { CartItem } from "../components/CartItem";

export default function Cart() {
  const { user } = useAppSelector((state) => state.user);

  const { numItems, items } = useAppSelector((state) => state.cart);

  if (numItems === 0) {
    return (
      <div className="pb-5">
        <h2 className="text-3xl font-medium tracking-wider">
          Your cart is empty
        </h2>
        <Link to="/products" className="mt-6 btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <SectionTitle title="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {Object.entries(items).map(([itemId, item]) => (
            <CartItem key={itemId} item={item} itemId={itemId} />
          ))}
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
