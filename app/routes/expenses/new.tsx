import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { addNewExpense } from "~/models/expense.server";
import { validateForm } from "~/utils";

const ExpenseSchema = z.object({
  title: z.string().min(1, "The title is required"),
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
    <Form method="post" className="flex flex-col items-center gap-4">
      <label className="flex flex-col gap-1">
        <span>Title</span>
        <input
          name="title"
          type="text"
          placeholder="Expense Title"
          className="rounded-full"
          defaultValue={data?.fields.title}
        />
      </label>
      {titleError && <p className="text-sm text-red-500">{titleError}</p>}
      <label className="flex flex-col gap-1">
        <span>Amount</span>
        <input
          name="amount"
          type="number"
          placeholder="Expense Title"
          className="rounded-full"
          defaultValue={data?.fields.amount ?? 0}
        />
      </label>
      {amountError && <p className="text-sm text-red-500">{amountError}</p>}

      <button className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white">
        Save Expense
      </button>
    </Form>
  );
};

export default AddNewExpensePage;
