import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import Button from "~/components/Elements/Button/Button";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

const ExpensesPage = () => {
  const { user } = useLoaderData<typeof loader>();
  return (
    <main className=" flex flex-col items-center">
      <div className="mt-16 flex flex-col  items-center gap-4">
        <h1 className="text-4xl">
          Welcome
          <span className="font-bold text-violet-500"> {user.username}</span>
        </h1>
        <Form method="post" action="/logout">
          <Button className="rounded-full" variant="outline">
            Logout
          </Button>
        </Form>
      </div>
      {/* <div className="mt-32 flex items-center gap-4">
        <Link to="." className="rounded-full bg-gray-600 px-6 py-2 text-white">
          Expenses
        </Link>
        <Link
          to="new"
          className="rounded-full bg-gray-600 px-6 py-2 text-white"
        >
          Add Expense
        </Link>
      </div> */}
      <div className="mt-16 w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default ExpensesPage;
