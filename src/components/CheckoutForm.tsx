import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { Store } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { RootState } from "../store";
import { clearCart } from "../features/cart/cartSlice";

import { comfySloth } from "../lib/axios";
import { formatPrice } from "../lib/utils";

import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { AxiosError } from "axios";

export const action =
  (store: Store<RootState>, queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().user.user;
    const { items, orderTotal, numItems } = store.getState().cart;

    const data = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems: Object.values(items),
      numItemsInCart: numItems,
    };

    try {
      await comfySloth.post(
        "/orders",
        { data },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      let message = "There was an error placing your order";
      if (error instanceof AxiosError) {
        const statusCode = error?.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          return redirect("/login");
        }
        message = error?.response?.data?.error?.message;
      }
      toast.error(message);
      return null;
    }
  };

export const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="First Name" name="name" type="text" />
      <FormInput label="Address" name="address" type="text" />
      <div className="mt-4">
        <Button type="submit" className="mt-4 btn btn-primary btn-block">
          Place Your Order
        </Button>
      </div>
    </Form>
  );
};
