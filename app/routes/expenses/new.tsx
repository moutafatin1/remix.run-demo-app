import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { InputField } from "~/components/Forms";
import { addNewExpense } from "~/models/expense.server";
import { validateForm } from "~/utils";

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

const badRequest = (data: ActionData) => json(data, { status: 400 });

export async function action({ request }: ActionArgs) {
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
  });

  return redirect("/expenses");
}

const AddNewExpensePage = () => {
  const data = useActionData<ActionData>();
  const titleError = data?.errors?.fieldErrors.title;
  const amountError = data?.errors?.fieldErrors.amount;
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

      <button className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white">
        Save Expense
      </button>
    </Form>
  );
};

export default AddNewExpensePage;
