import { TRegisterUser } from "core/types/registerUser";
import { prisma } from "lib/prisma";
import { hash } from "bcrypt";

export const registerUser = async ({
  email,
  name,
  password,
}: TRegisterUser) => {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) throw new Error("E-mail already exists.")

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
};
