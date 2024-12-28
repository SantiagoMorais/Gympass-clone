import { Gym, Prisma } from "@prisma/client";
import { IFindManyNearbyParams } from "core/interfaces/find-many-nearby-params";
import { prisma } from "lib/prisma";
import { GymsRepository } from "repositories/gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: { id },
    });

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE ( 6371 * acos( 
        cos( radians(CAST(${latitude} AS DOUBLE PRECISION)) ) 
        * cos( radians( latitude ) ) 
        * cos( radians( longitude ) - radians(CAST(${longitude} AS DOUBLE PRECISION)) ) 
        + sin( radians(CAST(${latitude} AS DOUBLE PRECISION)) ) 
        * sin( radians( latitude ) ) ) ) <= 10
  `;

    return gyms;
  }
}
