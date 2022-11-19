import type { Expense, User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "~/prisma.server";

export function getExpenses(userId: Expense["userId"]) {
  return prisma.expense.findMany({
    where: {
      userId,
    },
  });
}

export function addNewExpense({
  title,
  amount,
  id,
}: {
  title: string;
  amount: number;
  id: User["id"];
}) {
  return prisma.expense.create({
    data: {
      title,
      amount: new Prisma.Decimal(amount),
      userId: id,
    },
  });
}

export function deleteExpense(id: Expense["id"]) {
  return prisma.expense.delete({
    where: {
      id,
    },
  });
}
