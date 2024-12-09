import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CheckInsRepository } from "repositories/check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkins: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.checkins.push(checkIn);

    return checkIn;
  }
}
