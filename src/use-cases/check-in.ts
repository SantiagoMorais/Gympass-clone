import {
  ICheckInUseCaseRequest,
  ICheckInUseCaseResponse,
} from "core/interfaces/checkin-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { GymsRepository } from "repositories/gyms-repository";
import { ResourceNorFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";

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

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
    );

    const MAX_DISTANCE_IN_METERS = 100;

    if (distance > MAX_DISTANCE_IN_METERS) throw new Error();

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
