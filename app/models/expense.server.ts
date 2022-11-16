import { prisma } from "~/prisma.server";

export function getExpenses() {
  return prisma.expense.findMany();
}
