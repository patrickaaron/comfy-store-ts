import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { comfySloth } from "../lib/axios";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await comfySloth.post("/auth/local/register", data);
    toast.success("Registered Successfully");
    return redirect("/login");
  } catch (error) {
    let message = "please double check your credentials";
    if (error instanceof AxiosError) {
      message = error.response?.data?.error?.message;
    }

    toast.error(message);
    return null;
  }
};

export default function Register() {
  const navigation = useNavigation();

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="Username"
          placeholder="spaceman70"
          name="username"
          required
        />
        <FormInput
          type="email"
          label="Email"
          placeholder="user@example.com"
          name="email"
          required
        />
        <FormInput
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          name="password"
          required
        />
        <Button
          className="mt-4 btn btn-primary btn-block"
          type="submit"
          isLoading={navigation.state === "submitting"}
        >
          Register
        </Button>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
}
