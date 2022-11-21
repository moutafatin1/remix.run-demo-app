import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserStats } from "~/models/transaction.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const userStats = await getUserStats(userId);
  return { userStats };
}

const DashboardChildRoute = () => {
  const { userStats } = useLoaderData<typeof loader>();
  console.log(
    "🚀 ~ file: index.tsx ~ line 14 ~ DashboardChildRoute ~ userStats",
    userStats
  );
  return (
    <div className="py-6 px-4">
      <h1 className="text-center text-4xl font-bold">DashboardChildRoute</h1>
    </div>
  );
};

export default DashboardChildRoute;
