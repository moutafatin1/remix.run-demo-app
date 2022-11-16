import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { addNewExpense } from "~/models/expense.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const amountString = formData.get("amount");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          title: "Title is required",
          amount: null,
        },
      },
      { status: 400 }
    );
  }
  if (typeof amountString !== "string" || Number(amountString) === 0) {
    return json(
      {
        errors: {
          title: null,
          amount: "The amount must be greater than 0",
        },
      },
      { status: 400 }
    );
  }

  const newExpense = await addNewExpense({
    title,
    amount: Number(amountString),
  });

  return redirect("/expenses");
}

const AddNewExpensePage = () => {
  return (
    <Form method="post" className="flex flex-col items-center gap-4">
      <label className="flex flex-col gap-1">
        <span>Title</span>
        <input
          name="title"
          type="text"
          placeholder="Expense Title"
          className="rounded-full"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Amount</span>
        <input
          name="amount"
          type="number"
          placeholder="Expense Title"
          className="rounded-full"
        />
      </label>
      <button className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white">
        Save Expense
      </button>
    </Form>
  );
};

export default AddNewExpensePage;
