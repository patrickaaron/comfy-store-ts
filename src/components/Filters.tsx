import { Link, Form, useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { MetaData } from "../types/db";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormRange } from "./FormRange";
import { FormCheckbox } from "./FormCheckbox";

interface FiltersProps {
  data: MetaData;
}

export const Filters = ({ data }: FiltersProps) => {
  const [searchParams] = useSearchParams();
  const params = queryString.parse(searchParams.toString()) as any;
  const { categories, companies } = data;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* Search */}
      <FormInput
        type="search"
        label="Search Product"
        name="search"
        className="input-sm"
        defaultValue={params.search!}
      />
      {/* Categories */}
      <FormSelect
        label="Select Category"
        name="category"
        options={categories}
        size="select-sm"
        defaultValue={params.category}
      />
      {/* Companies */}
      <FormSelect
        label="Select Company"
        name="company"
        options={companies}
        size="select-sm"
        defaultValue={params.company}
      />
      {/* Order */}
      <FormSelect
        label="Sort By"
        name="order"
        options={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={params.order}
      />
      {/* Price */}
      <FormRange
        label="Select Price"
        name="price"
        size="range-sm"
        step={1000}
        value={params.price}
        max={100000}
      />
      {/* Shipping */}
      <FormCheckbox
        label="Free Shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={params.shipping}
      />
      {/* Buttons */}
      <button className="btn btn-primary btn-sm">Search</button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};
