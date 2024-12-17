import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "use-cases/gym-use-cases/search-gyms";

export const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
};
