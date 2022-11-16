import { Link, Outlet } from "@remix-run/react";

const ExpensesPage = () => {
  return (
    <main className="h-screen bg-gray-300 items-center flex flex-col">
      <div className="mt-32 flex items-center gap-4">
        <Link to="." className="px-6 py-2 rounded-full bg-gray-600 text-white">
          Expenses
        </Link>
        <Link
          to="new"
          className="px-6 py-2 rounded-full bg-gray-600 text-white"
        >
          Add Expense
        </Link>
      </div>
      <div className="mt-16 w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default ExpensesPage;
