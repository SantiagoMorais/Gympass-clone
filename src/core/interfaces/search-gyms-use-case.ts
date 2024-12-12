import { Gym } from "@prisma/client";

export interface ISearchGymsUseCaseRequest {
  query: string;
  page: number;
}

export interface ISearchGymsUseCaseResponse {
  gyms: Gym[];
}
