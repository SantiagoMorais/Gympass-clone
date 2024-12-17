import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "use-cases/gym-use-cases/create-gym";

export const makeCreateGymUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
};
