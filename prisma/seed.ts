import type { Expense } from "@prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function seed() {
  const hashedPassword = await argon2.hash("test123456");

  const user = await prisma.user.create({
    data: {
      username: "test4444",
      hashedPassword,
    },
  });

  const expenses: Pick<Expense, "title" | "amount" | "userId">[] = [
    {
      title: "Programming Course",
      amount: new Prisma.Decimal(9.99),
      userId: user.id,
    },
    {
      title: "Design Course",
      amount: new Prisma.Decimal(19.99),
      userId: user.id,
    },
    {
      title: "Marketing Course",
      amount: new Prisma.Decimal(209.99),
      userId: user.id,
    },
  ];

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
