import { prisma } from "lib/prisma";
import { app } from "app";

export const setupApp = async () => {
  await app.ready();
  await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);
  await prisma.$queryRawUnsafe(`VACUUM;`);
};

export const cleanupDatabase = async () => {
  const tables = await prisma.$queryRawUnsafe<{ name: string }[]>(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
  );

  for (const { name } of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM ${name}`);
  }
};

export const teardownApp = async () => {
  await app.close();
};
