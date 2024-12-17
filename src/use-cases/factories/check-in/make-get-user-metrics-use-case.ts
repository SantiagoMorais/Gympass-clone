import { PrismaCheckInRepository } from "repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "use-cases/check-in-use-cases/get-user-metrics";

export const makeGetUserMetricsUseCase = () => {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
};
