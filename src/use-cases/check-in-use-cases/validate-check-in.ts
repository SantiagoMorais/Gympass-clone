import {
  IValidateCheckInUseCaseRequest,
  IValidateCheckInUseCaseResponse,
} from "core/interfaces/validate-check-in-use-case";
import dayjs from "dayjs";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { LateCheckInValidationError } from "use-cases/errors/late-check-in-validation-error";
import { ResourceNotFoundError } from "use-cases/errors/resource-not-found-error";

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new LateCheckInValidationError();

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
