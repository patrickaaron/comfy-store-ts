import { formatPrice } from "../../lib/utils";
import { Product } from "@/src/types/db";
import { Link } from "react-router-dom";

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, price, image, company, colors } = product.attributes;
        const dollarsAmount = formatPrice(Number(price));

        return (
          <Link
            key={title}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="font-medium text-lg capitalize">{title}</h3>
              <h4 className="text-md text-neutral-content">{company}</h4>
              <div className="mt-2">
                {colors.map((color) => (
                  <button
                    key={`${product.id}-${color}`}
                    type="button"
                    className="badge w-6 h-6 mr-2"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
