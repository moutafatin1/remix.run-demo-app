import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useTransition as useNavigation,
} from "@remix-run/react";
import { AiOutlinePlus } from "react-icons/ai";
import { z } from "zod";
import Button from "~/components/Elements/Button/Button";
import { InputField } from "~/components/Forms";
import { addNewExpense } from "~/models/expense.server";
import { requireUserId } from "~/session.server";
import { badRequest, validateForm } from "~/utils";

const ExpenseSchema = z.object({
  title: z.string().min(5, "The title must be at least 5 character"),
  amount: z.string().min(1, "The amount is required"),
});

type ExpenseFields = z.infer<typeof ExpenseSchema>;
type ExpenseFieldsError = z.inferFlattenedErrors<typeof ExpenseSchema>;

type ActionData = {
  fields: ExpenseFields;
  errors?: ExpenseFieldsError;
};

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const { errors, fields } = await validateForm(request, ExpenseSchema);

  if (errors) {
    return badRequest({
      fields,
      errors,
    });
  }

  await addNewExpense({
    title: fields.title,
    amount: parseFloat(fields.amount),
    id: userId,
  });


  return redirect("/expenses");
}

const AddNewExpensePage = () => {
  const data = useActionData<ActionData>();
  const navigation = useNavigation();
  const titleError = data?.errors?.fieldErrors.title;
  const amountError = data?.errors?.fieldErrors.amount;
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form
      method="post"
      className="mx-auto flex max-w-xs flex-col items-center gap-4"
    >
      <InputField
        name="title"
        placeholder="title"
        label="title"
        defaultValue={data?.fields.title}
        errorMessage={titleError}
        required
      />
      <InputField
        name="amount"
        placeholder="amount"
        label="amount"
        type="number"
        defaultValue={data?.fields.amount}
        errorMessage={amountError}
        required
      />

      <Button
        className="rounded-full"
        variant="outline"
        isLoading={isSubmitting}
        startIcon={<AiOutlinePlus />}
      >
        Save Expense
      </Button>
    </Form>
  );
};

export default AddNewExpensePage;
