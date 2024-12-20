import {
  IFetchNearbyGymsUseCaseRequest,
  IFetchNearbyGymsUseCaseResponse,
} from "core/interfaces/fetch-nearby-gyms-use-case";
import { GymsRepository } from "repositories/gyms-repository";

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
