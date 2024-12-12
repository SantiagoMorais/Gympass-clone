import {
  IValidateCheckInUseCaseRequest,
  IValidateCheckInUseCaseResponse,
} from "core/interfaces/validate-check-in-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { ResourceNotFoundError } from "use-cases/errors/resource-not-found-error";

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
