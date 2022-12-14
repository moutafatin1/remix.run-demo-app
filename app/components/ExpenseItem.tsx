import { useFetcher } from "@remix-run/react";
import Button from "./Elements/Button/Button";

type ExpenseItemProps = {
  title: string;
  amount: string;
  id: string;
};

export const ExpenseItem = ({ amount, title, id }: ExpenseItemProps) => {
  const fetcher = useFetcher();
  const handleDelete = () => {
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  };
  return (
    <li className="flex w-full items-center justify-between rounded-xl border-2 border-purple-500 p-4">
      <span className="flex flex-col text-white">
        <span className="text-3xl font-bold text-gray-700">{title}</span>
        <span className="text-lg font-semibold text-gray-600">${amount}</span>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Button onClick={handleDelete} className="w-24 bg-red-400">
          Delete
        </Button>
        <Button className="w-24 bg-teal-400">Edit</Button>
      </span>
    </li>
  );
};
