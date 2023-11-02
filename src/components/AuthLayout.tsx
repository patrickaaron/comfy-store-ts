import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-store";

export const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
