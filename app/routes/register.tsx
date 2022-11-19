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
import { createUser, getUserByUsername } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { badRequest, validateForm } from "~/utils";

const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Your username should have at least 8 characters"),
  password: z
    .string()
    .min(8, "Your password should have at least 8 characters"),
});

type ActionData = {
  fields: z.infer<typeof registerSchema>;
  errors?: z.inferFlattenedErrors<typeof registerSchema>;
};

export async function action({ request }: ActionArgs) {
  const { errors, fields } = await validateForm(request, registerSchema);

  if (errors) {
    return badRequest<ActionData>({
      fields,
      errors,
    });
  }

  const existingUser = await getUserByUsername(fields.username);

  if (existingUser) {
    return badRequest<ActionData>({
      fields,
      errors: {
        formErrors: [],
        fieldErrors: {
          username: ["A user already exists with this email"],
        },
      },
    });
  }

  const user = await createUser(fields.username, fields.password);

  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/expenses",
  });
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

const RegisterPage = () => {
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
          Register
        </Button>
      </Form>
    </main>
  );
};

export default RegisterPage;
