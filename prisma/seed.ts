import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function seed() {
  const hashedPassword = await argon2.hash("test123456");

  const user = await prisma.user.create({
    data: {
      username: "test0000",
      hashedPassword,
    },
  });

  const educationCategory = await prisma.category.create({
    data: {
      name: "Education",
      emoji: "📚",
      userId: user.id,
    },
  });
  const travelCategory = await prisma.category.create({
    data: {
      name: "Travel",
      emoji: "✈️",
      userId: user.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: "income",
      amount: 15.1,
      categoryId: educationCategory.id,
      userId: user.id,
    },
  });
  await prisma.transaction.create({
    data: {
      type: "expense",
      amount: 15.1,
      categoryId: travelCategory.id,
      userId: user.id,
    },
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
