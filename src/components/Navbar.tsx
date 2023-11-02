import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";

import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

import { useAppSelector } from "../hooks/redux-store";

export const Navbar = () => {
  const { numItems } = useAppSelector((state) => state.cart);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* HOME ICON */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>
          {/* NAVIGATION DROPDOWN */}
          <div className="dropdown">
            <label htmlFor="" tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            {/* NAVIGATION LINKS */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        {/* NAVIGATION MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeToggle />

          {/* CART */}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="indicator-item badge badge-sm badge-primary rounded-full">
                {numItems}
              </span>
            </div>
          </NavLink>

          <UserMenu />
        </div>
      </div>
    </nav>
  );
};
