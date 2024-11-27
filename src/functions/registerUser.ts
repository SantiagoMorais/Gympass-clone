import { TRegisterUser } from "core/types/registerUser";
import { prisma } from "lib/prisma";

export const registerUser = async ({
  email,
  name,
  password,
  res,
}: TRegisterUser) => {
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return res.status(201).send();
};
