import type { User } from "@prisma/client";
import * as argon2 from "argon2";
import { prisma } from "~/prisma.server";

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await argon2.hash(password);
  return prisma.user.create({
    data: {
      username,
      hashedPassword,
    },
  });
};

export function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
