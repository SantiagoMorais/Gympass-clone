import { PrismaCheckInRepository } from "repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "use-cases/check-in-use-cases/fetch-user-check-ins-history";

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
};
