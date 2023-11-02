import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { BsFillGridFill, BsList } from "react-icons/bs";
import queryString, { ParsedQuery } from "query-string";

import { comfySloth } from "../lib/axios";
import { cn } from "../lib/utils";
import { MetaData, Product } from "../types/db";
import { Filters } from "../components/Filters";
import { ProductsGrid } from "../components/products/ProductsGrid";
import { ProductsList } from "../components/products/ProductsList";
import { Pagination } from "../components/Pagination";

const productsQuery = (params: ParsedQuery<string>) => {
  const { search, category, company, sort, price, shipping, page } = params;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? "100000",
      shipping ?? false,
      page ?? "1",
    ],
    queryFn: () => comfySloth.get("/products", { params }),
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    const params = queryString.parse(searchParams.toString());

    const response = await queryClient.ensureQueryData(productsQuery(params));
    const { data: products, meta } = response.data;
    return { products, meta };
  };

type Layout = "grid" | "list";

const layoutIconMap = {
  grid: <BsFillGridFill />,
  list: <BsList />,
};

const layoutComponentMap = {
  grid: ProductsGrid,
  list: ProductsList,
};

type LoaderData = {
  products: Product[];
  meta: MetaData;
};

export default function Products() {
  const { products, meta } = useLoaderData() as LoaderData;
  const { total, page, pageSize, pageCount } = meta.pagination;
  const [activeLayout, setActiveLayout] = useState<Layout>("grid");

  const CurrentView = layoutComponentMap[activeLayout];

  return (
    <>
      <Filters data={meta} />
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {total} product{total > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          {(["grid", "list"] as Layout[]).map((layout) => (
            <button
              key={layout}
              className={cn(
                "text-xl btn btn-circle btn-sm",
                activeLayout === layout
                  ? "btn-primary text-primary-content"
                  : "btn-ghost text-base-content"
              )}
              onClick={() => setActiveLayout(layout)}
            >
              {layoutIconMap[layout]}
            </button>
          ))}
        </div>
      </div>
      {/* Products */}
      <div>
        {products.length === 0 && (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        )}
        {!!total && <CurrentView products={products} />}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalCount={total}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </>
  );
}
