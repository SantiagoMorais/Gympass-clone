import { PrismaCheckInRepository } from "repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "use-cases/check-in-use-cases/validate-check-in";

export const makeValidateCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
};
