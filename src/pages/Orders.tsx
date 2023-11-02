import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { Store } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import queryString, { ParsedQuery } from "query-string";
import toast from "react-hot-toast";

import { comfySloth } from "../lib/axios";
import { RootState } from "../store";
import { SectionTitle } from "../components/SectionTitle";
import { Pagination } from "../components/Pagination";
import { OrdersList } from "../components/OrdersList";

import { MetaData, Order, User } from "../types/db";

const ordersQuery = (params: ParsedQuery<string>, user: User) => {
  return {
    queryKey: ["orders", user.username, params.page ?? "1"],
    queryFn: () =>
      comfySloth.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store: Store<RootState>, queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const { user } = store.getState().user;

    if (!user) {
      toast("You must be logged in to view orders");
      return redirect("/login");
    }

    const { searchParams } = new URL(request.url);
    const params = queryString.parse(searchParams.toString());

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      let message = "There was an error accessing your orders";
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

type LoaderData = {
  orders: Order[];
  meta: MetaData;
};

export default function Orders() {
  const { orders, meta } = useLoaderData() as LoaderData;
  const { total, page, pageSize, pageCount } = meta.pagination;

  return (
    <>
      <SectionTitle title="Your orders" />
      <OrdersList orders={orders} meta={meta} />
      <Pagination
        currentPage={page}
        totalCount={total}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </>
  );
}
