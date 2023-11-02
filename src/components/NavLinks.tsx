import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-store";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "orders", text: "orders" },
];

export const NavLinks = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        // Only signed user can view orders and settings nav links
        if ((url === "orders" || url === "checkout") && !user) return null;
        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
