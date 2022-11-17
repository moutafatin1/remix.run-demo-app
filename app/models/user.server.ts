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

export async function verifyLogin(username: string, password: string) {
  const user = await getUserByUsername(username);

  if (!user) return null;

  const isValid = await argon2.verify(user.hashedPassword, password);

  if (!isValid) return null;

  const { hashedPassword, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
