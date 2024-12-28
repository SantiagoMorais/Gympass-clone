import { prisma } from "lib/prisma";

export const cleanupDatabase = async () => {
  await prisma.user.deleteMany();
  await prisma.gym.deleteMany();
  await prisma.checkIn.deleteMany();
};
