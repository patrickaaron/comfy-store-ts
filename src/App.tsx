import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "./store";

import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

// Loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";

// Actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as checkoutAction } from "./components/CheckoutForm";

import { AuthLayout } from "./components/AuthLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<Error />}>
      {/* Main route group */}
      <Route path="" element={<HomeLayout />}>
        <Route
          index
          element={<Landing />}
          loader={landingLoader(queryClient)}
        />
        <Route
          path="products"
          element={<Products />}
          loader={productsLoader(queryClient)}
        />
        <Route
          path="products/:id"
          element={<SingleProduct />}
          loader={singleProductLoader(queryClient)}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route
          path="checkout"
          element={<Checkout />}
          loader={checkoutLoader(store)}
          action={checkoutAction(store, queryClient)}
        />
        <Route
          path="orders"
          element={<Orders />}
          loader={ordersLoader(store, queryClient)}
        />
      </Route>
      {/* Credential routes */}
      <Route path="" element={<AuthLayout />}>
        <Route path="login" element={<Login />} action={loginAction(store)} />
        <Route path="register" element={<Register />} action={registerAction} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
