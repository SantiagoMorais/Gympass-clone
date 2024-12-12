import { Gym } from "@prisma/client";

export interface IFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

export interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}
