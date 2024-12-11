import {
  ICheckInUseCaseRequest,
  ICheckInUseCaseResponse,
} from "core/interfaces/checkin-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { GymsRepository } from "repositories/gyms-repository";
import { ResourceNorFoundError } from "./errors/resource-not-found-error";

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNorFoundError();

    // calculate distance between the gym and user
    // The distance cannot be larger than 100m

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) throw new Error();

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
