import {
  ISearchGymsUseCaseRequest,
  ISearchGymsUseCaseResponse,
} from "core/interfaces/search-gyms-use-case";
import { GymsRepository } from "repositories/gyms-repository";

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
