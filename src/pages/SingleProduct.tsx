import { useState } from "react";
import { Params, useLoaderData, Link } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

import { CartItem, Product } from "../types/db";

import { comfySloth } from "../lib/axios";
import { cn, formatPrice } from "../lib/utils";

import { Options } from "../components/Options";

import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id: string) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => comfySloth.get(`/products/${id}`),
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id!)
    );
    return { product: response.data.data };
  };

export default function SingleProduct() {
  const { product } = useLoaderData() as { product: Product };
  const { image, title, price, description, colors, company } =
    product.attributes;

  const dollarsAmount = formatPrice(Number(price));
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const addToCart = () => {
    const key = `${product.id}${productColor}`;

    const item: CartItem = {
      // id: `${product.id}$${productColor}`,
      productId: product.id,
      image,
      title,
      price: Number(price),
      company,
      amount,
      color: productColor,
    };
    dispatch(addItem({ key, item }));
  };

  return (
    <section>
      {/* Header */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* Product */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider">Colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={`${product.id}-${color}`}
                    type="button"
                    className={cn(
                      "badge w-6 h-6 mr-2",
                      color === productColor && "border-2 border-secondary"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  />
                );
              })}
            </div>
          </div>
          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider">Amount</h4>
            </label>
            <select
              className="select select-secondary select-bordered"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              id="amount"
            >
              <Options range={[1, 5, 1]} />
            </select>
          </div>
          {/* Cart Button */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
