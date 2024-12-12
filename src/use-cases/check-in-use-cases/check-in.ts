import {
  ICheckInUseCaseRequest,
  ICheckInUseCaseResponse,
} from "core/interfaces/checkin-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { GymsRepository } from "repositories/gyms-repository";
import { MaxDistanceError } from "use-cases/errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "use-cases/errors/max-number-of-check-ins-error";
import { ResourceNotFoundError } from "use-cases/errors/resource-not-found-error";
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

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
    );

    const MAX_DISTANCE_IN_METERS = 100;

    if (distance > MAX_DISTANCE_IN_METERS) throw new MaxDistanceError();

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) throw new MaxNumberOfCheckInsError();

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
