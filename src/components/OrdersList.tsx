import dayjs from "dayjs";
import { MetaData, Order } from "../types/db";

interface OrdersListProps {
  orders: Order[];
  meta: MetaData;
}

export const OrdersList = ({ orders, meta }: OrdersListProps) => {
  return (
    <div className="mt-8">
      <h4 className="mb-4 font-medium tracking-wide">
        Total Orders: {meta.pagination.total}{" "}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              const date = dayjs(createdAt).format("hh:mm a - MMM DD, YYYY");

              return (
                <tr key={order.id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
