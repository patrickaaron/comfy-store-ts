import { FaTrash } from "react-icons/fa6";

import { useAppDispatch } from "../hooks/redux-store";
import { editItem, removeItem } from "../features/cart/cartSlice";

import { CartItem as ProductItem } from "../types/db";
import { formatPrice } from "../lib/utils";
import { Options } from "./Options";

interface CartItemProps {
  item: ProductItem;
  itemId: string;
}

export const CartItem = ({ item, itemId }: CartItemProps) => {
  const { title, price, image, company, color, amount } = item;
  const dispatch = useAppDispatch();

  const removeItemFromCart = () => {
    dispatch(removeItem({ itemId }));
  };

  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(editItem({ itemId, amount: Number(e.target.value) }));
  };

  return (
    <article className="mb-12 flex flex-col gap-y-4 xs:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0 relative">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg xs:h-32 xs:w-32 object-cover"
      />
      {/* Info */}
      <div className="xs:ml-12 md:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm flex items-center gap-x-2">
          Color :
          <span className="badge badge-sm" style={{ backgroundColor: color }} />
        </p>
      </div>

      <div className="xs:ml-12">
        {/* Amount Options */}
        <div className="form-control max-w-x">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            <Options range={[1, 5, 1]} />
          </select>
        </div>
        {/* Remove Button */}
        <button
          className="xs:mt-4 xs:w-full justify-center items-center xs:flex xs:static absolute top-4 right-4 text-red-700 text-lg"
          onClick={removeItemFromCart}
        >
          <FaTrash />
        </button>
      </div>

      {/* Price */}
      <p className="font-medium xs:ml-16 lg:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};
