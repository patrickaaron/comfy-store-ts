import { useAppSelector } from "../hooks/redux-store";
import { formatPrice } from "../lib/utils";

export const CartTotals = () => {
  const { cartTotal, shippingFee, taxFee, orderTotal } = useAppSelector(
    (state) => state.cart
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* Subtotal */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        {/* Shipping */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping Fee</span>
          <span className="font-medium">{formatPrice(shippingFee)}</span>
        </p>
        {/* Tax */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax Fee</span>
          <span className="font-medium">{formatPrice(taxFee)}</span>
        </p>
        {/* Total */}
        <p className="mt-4 flex justify-between text-sm pb-2">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};
