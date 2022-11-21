import type { User } from "@prisma/client";

export async function getUserStats(userId: User["id"]) {
  const incomeAggregation = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: "income",
    },
  });

  const expenseAggregation = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: "expense",
    },
  });

  const totalIncome = incomeAggregation._sum.amount ?? 0;
  const totalExpense = expenseAggregation._sum.amount ?? 0;
  const balance = totalIncome - totalExpense;

  return { totalExpense, totalIncome, balance };
}
