import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
    </div>
  );
};

export default DashboardChildRoute;
