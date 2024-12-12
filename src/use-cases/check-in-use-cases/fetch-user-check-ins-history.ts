import {
  IFetchUserCheckInsHistoryUseCaseRequest,
  IFetchUserCheckInsHistoryUseCaseResponse,
} from "core/interfaces/fetch-user-check-ins-history-use-case";
import { CheckInsRepository } from "repositories/check-ins-repository";

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
