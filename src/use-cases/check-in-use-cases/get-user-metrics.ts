import {
  IGetUserMetricsUseCaseRequest,
  IGetUserMetricsUseCaseResponse,
} from "core/interfaces/get-user-metrics-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsUseCaseRequest): Promise<IGetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
