import {
  ICheckInUseCaseRequest,
  ICheckInUseCaseResponse,
} from "core/interfaces/checkin-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
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
