import { PrismaCheckInRepository } from "repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "use-cases/check-in-use-cases/check-in";

export const makeCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
};
