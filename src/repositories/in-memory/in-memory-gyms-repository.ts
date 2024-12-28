import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IFindManyNearbyParams } from "core/interfaces/find-many-nearby-params";
import { randomUUID } from "crypto";
import { GymsRepository } from "repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";

export class inMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      title: data.title,
      phone: data.phone ?? null,
      create_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async findManyNearby(params: IFindManyNearbyParams) {
    const nearbyGyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: Number(gym.latitude), longitude: Number(gym.longitude) },
        { latitude: params.latitude, longitude: params.longitude }
      );

      return distance < 10000; //10 km;
    });

    return nearbyGyms;
  }
}
