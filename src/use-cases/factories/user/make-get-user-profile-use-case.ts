import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository";
import { GetUserProfile } from "use-cases/user-use-cases/get-user-profile";

export const makeGetUserProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfile(usersRepository);

  return useCase;
};
