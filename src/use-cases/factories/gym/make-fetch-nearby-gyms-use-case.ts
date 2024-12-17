import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "use-cases/gym-use-cases/fetch-nearby-gyms";

export const makeFetchNearbyGymUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
};
