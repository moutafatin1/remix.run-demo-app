import { useLoaderData } from "@remix-run/react";
import { ExpenseItem } from "~/components";

export async function loader() {
  const expensesList = [
    {
      id: "abdccc",
      title: "First amount",
      amount: 15.11,
    },
    {
      id: "blablo",
      title: "second amount",
      amount: 10.11,
    },
  ];

  return expensesList;
}

const ExpensesChildPage = () => {
  const expensesList = useLoaderData<typeof loader>();
  return (
    <ul className="w-full max-w-2xl mx-auto space-y-4">
      {expensesList.map((expenseItem) => (
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
