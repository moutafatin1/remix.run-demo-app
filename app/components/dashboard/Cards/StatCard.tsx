import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";
import { fn } from "~/utils";

type StatCardProps = {
  amount: number;
  type: "income" | "expense" | "balance";
};

export const StatCard = ({ amount, type }: StatCardProps) => {
  return (
    <div className="flex w-72 flex-col gap-2 rounded-md bg-white p-6 shadow-md">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-gray-600">
            {type === "expense" ? "Expense" : "Income"}
          </span>
          <span className="text-3xl font-bold text-gray-900">${amount}</span>
        </div>
        <div
          className={fn(
            type === "income" && "bg-[#28a745]/30",
            type === "expense" && "bg-red-500/30",
            type === "balance" && "bg-orange-500/30",
            "ml-auto flex h-20 w-20 items-center justify-center rounded-full"
          )}
        >
          {type === "income" && (
            <GiReceiveMoney className="text-5xl text-[#28a745]" />
          )}
          {type === "expense" && (
            <GiPayMoney className="text-5xl text-red-500" />
          )}
          {type === "balance" && (
            <RiBankCardFill className="text-5xl text-orange-500" />
          )}
        </div>
      </div>
      <span className="flex items-center gap-1  text-sm text-gray-400">
        <span
          className={fn(
            "flex items-center font-bold",
            type === "income" && "text-[#28a745]",
            type === "expense" && "text-red-500",
            type === "balance" && "text-red-500"
          )}
        >
          {type === "income" && <AiOutlineArrowUp className="stroke-[100]" />}
          {type === "expense" && (
            <AiOutlineArrowDown className="stroke-[100]" />
          )}
          {type === "balance" && (
            <AiOutlineArrowDown className="stroke-[100]" />
          )}
          3%
        </span>
        vs last 30 days
      </span>
    </div>
  );
};
