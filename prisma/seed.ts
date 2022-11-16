import type { Expense } from "@prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const expenses: Pick<Expense, "title" | "amount">[] = [
  {
    title: "Programming Course",
    amount: new Prisma.Decimal(9.99),
  },
  {
    title: "Design Course",
    amount: new Prisma.Decimal(19.99),
  },
  {
    title: "Marketing Course",
    amount: new Prisma.Decimal(209.99),
  },
];

async function seed() {
  expenses.forEach(async (expense) => {
    await prisma.expense.create({
      data: {
        ...expense,
      },
    });
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
