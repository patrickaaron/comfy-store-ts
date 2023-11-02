import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/redux-store";
import { logoutUser } from "../features/user/userSlice";
import { cn } from "../lib/utils";

export const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <div className="dropdown dropdown-end ml-4">
      {/* Dropdown Trigger */}
      <label tabIndex={0} className="btn btn-sm btn-circle rounded-full">
        <div className={cn("avatar", user && "placeholder")}>
          <div
            className={cn(
              "w-8 rounded-full",
              user && "bg-neutral-focus text-neutral-content"
            )}
          >
            {user ? (
              <span className="text-lg">{user.email.charAt(0)}</span>
            ) : (
              <img src="/placeholder.jpg" alt="user" />
            )}
          </div>
        </div>
      </label>

      {/* Dropdown Content */}
      <ul className="dropdown-content z-[1] menu p-2 mt-1 shadow bg-base-200 rounded-box w-52">
        {user ? (
          <li>
            <button
              className="btn btn-sm btn-ghost justify-start text-[14px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            {["/login", "/register"].map((url) => (
              <li key={url}>
                <Link
                  to={url}
                  className="btn btn-sm btn-ghost justify-start text-[14px]"
                >
                  {url === "/login" ? "Sign in / Guest" : "Create an Account"}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
