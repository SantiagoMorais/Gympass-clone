import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "use-cases/user-use-cases/authenticate";

export const makeAuthenticateUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
};
