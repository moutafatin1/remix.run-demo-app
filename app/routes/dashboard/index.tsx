import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CategoryPie } from "~/components/charts/CategoryPie";
import { ExpensesLineChart } from "~/components/charts/ExpensesLineChart";
import { StatCard } from "~/components/dashboard/Cards";
import { getUserStats } from "~/models/transaction.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const userStats = await getUserStats(userId);
  return { userStats };
}

const DashboardChildRoute = () => {
  const { userStats } = useLoaderData<typeof loader>();

  return (
    <div className="py-6 px-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <StatCard type="income" amount={487.54} />
        <StatCard type="expense" amount={124.54} />
        <StatCard type="balance" amount={1547.54} />
      </div>
      <div className="mt-10 flex h-full flex-col  gap-8 lg:flex-row">
        <div className="h-96 w-full rounded-md  bg-white shadow-md lg:w-1/2">
          <CategoryPie />
        </div>
        <div className="h-96 w-full min-w-0  rounded-md  bg-white shadow-md ">
          <ExpensesLineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardChildRoute;
