import { Prisma } from "@prisma/client";
import { prisma } from "~/prisma.server";

export function getExpenses() {
  return prisma.expense.findMany();
}

export function addNewExpense({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  return prisma.expense.create({
    data: {
      title,
      amount: new Prisma.Decimal(amount),
    },
  });
}
