import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type ExpenseItemProps = {
  title: string;
  amount: number;
};

export const ExpenseItem = ({ amount, title }: ExpenseItemProps) => {
  return (
    <li className="w-full flex items-center justify-between bg-gray-500 rounded-xl p-4">
      <span className="flex flex-col text-white">
        <span className="text-2xl font-bold ">{title}</span>
        <span className="font-semibold">${amount}</span>
      </span>
      <span className="flex items-center gap-4">
        <button>
          <AiFillDelete className="text-2xl text-red-600" />
        </button>
        <button>
          <AiFillEdit className="text-2xl text-teal-500" />
        </button>
      </span>
    </li>
  );
};
