import { Gym, Prisma } from "@prisma/client";
import { findManyNearbyParams } from "core/interfaces/find-many-nearby-params";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>;
}
