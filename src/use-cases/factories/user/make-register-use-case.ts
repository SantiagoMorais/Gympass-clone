import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "use-cases/user-use-cases/register";

export const makeRegisterUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
};
