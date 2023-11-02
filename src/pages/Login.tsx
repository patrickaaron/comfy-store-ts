import { useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { Store } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { RootState } from "../store";
import { loginUser } from "../features/user/userSlice";

import { comfySloth } from "../lib/axios";

import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

export const action =
  (store: Store<RootState>) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const data = Object.fromEntries(formData);

    try {
      const response = await comfySloth.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      if (intent !== "guest") toast.success("Welcome Back");
      return redirect("/");
    } catch (error) {
      let message = "please double check your credentials";
      if (error instanceof AxiosError) {
        message = error.response?.data?.error?.message;
      }

      toast.error(message);
      return null;
    }
  };

export default function Login() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({ identifier: "", password: "" });

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="Email"
          placeholder="user@example.com"
          name="identifier"
          value={formData.identifier}
          onChange={(e) =>
            setFormData({ ...formData, identifier: e.target.value })
          }
          required
        />
        <FormInput
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <Button
          className="mt-4 btn btn-primary btn-block"
          type="submit"
          isLoading={navigation.state === "submitting"}
        >
          Login
        </Button>
        <Button
          className="btn btn-secondary btn-block"
          type="submit"
          isLoading={navigation.state === "submitting"}
          name="intent"
          value="guest"
          onClick={() =>
            setFormData({ identifier: "test@test.com", password: "secret" })
          }
        >
          guest user
        </Button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}
