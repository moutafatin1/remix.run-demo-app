import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteExpense } from "~/models/expense.server";

// export async function loader() {
//   return json("hello");
// }

export async function action({ params, request }: ActionArgs) {
  const expenseId = params.id;
  invariant(expenseId, `expenseId not found`);

  if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    console.log(expenseId);

    return json({});
  }
}
