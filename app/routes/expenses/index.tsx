import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ExpenseItem } from "~/components";
import { getExpenses } from "~/models/expense.server";

export async function loader() {
  const expenses = await getExpenses();

  return json(expenses);
}

const ExpensesChildPage = () => {
  const expenses = useLoaderData<typeof loader>();
  return (
    <ul className="mx-auto w-full max-w-2xl space-y-4">
      {expenses.map((expenseItem) => (
        <ExpenseItem
          key={expenseItem.id}
          title={expenseItem.title}
          amount={expenseItem.amount}
        />
      ))}
    </ul>
  );
};

export default ExpensesChildPage;
