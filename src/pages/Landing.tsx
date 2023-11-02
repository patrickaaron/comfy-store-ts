import { useLoaderData } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { comfySloth } from "../lib/axios";
import { Product } from "../types/db";
import { Hero } from "../components/Hero";
import { SectionTitle } from "../components/SectionTitle";
import { ProductsGrid } from "../components/products/ProductsGrid";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => comfySloth.get("/products?featured=true"),
};

export const loader = (queryClient: QueryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;

  return { products };
};

export default function Landing() {
  const { products } = useLoaderData() as { products: Product[] };

  return (
    <>
      <Hero />
      <div className="pt-24">
        <SectionTitle title="Featured Products" />
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
