import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useTransition as useNavigation,
} from "@remix-run/react";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { z } from "zod";
import Button from "~/components/Elements/Button/Button";
import { InputField } from "~/components/Forms";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { badRequest, validateForm } from "~/utils";

const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Your username should have at least 8 characters"),
  password: z
    .string()
    .min(8, "Your password should have at least 8 characters"),
});

type ActionData = {
  fields: z.infer<typeof loginSchema>;
  errors?: z.inferFlattenedErrors<typeof loginSchema>;
};

export async function action({ request }: ActionArgs) {
  const { fields, errors } = await validateForm(request, loginSchema);

  if (errors) {
    return badRequest<ActionData>({
      fields,
      errors,
    });
  }
  const user = await verifyLogin(fields.username, fields.password);
  if (!user) {
    return badRequest<ActionData>({
      fields,
      errors: {
        formErrors: [],
        fieldErrors: {
          username: ["Invalid username or password"],
        },
      },
    });
  }

  return createUserSession({
    request,
    redirectTo: "/expenses",
    userId: user.id,
  });
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

const LoginPage = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <main className="flex h-screen items-center justify-center bg-gray-200">
      <Form
        method="post"
        className="flex w-full max-w-xs flex-col gap-4 rounded-md border border-violet-500 p-8"
      >
        <InputField
          name="username"
          placeholder="Username"
          label="username"
          className="rounded-full"
          startIcon={<AiOutlineUser />}
          defaultValue={actionData?.fields.username}
          errorMessage={actionData?.errors?.fieldErrors.username}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          label="password"
          className="rounded-full"
          startIcon={<AiFillLock />}
          defaultValue={actionData?.fields.password}
          errorMessage={actionData?.errors?.fieldErrors.password}
          required
        />
        <Button isLoading={isSubmitting} className="rounded-full">
          Login
        </Button>
      </Form>
    </main>
  );
};

export default LoginPage;
