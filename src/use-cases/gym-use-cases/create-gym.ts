import { TGymResponse, TGymUseCaseRequest } from "core/types/gym-use-case";
import { GymsRepository } from "repositories/gyms-repository";
import { InvalidCredentialsError } from "use-cases/errors/invalid-credentials-error";

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: TGymUseCaseRequest): Promise<TGymResponse> {
    const gym = await this.gymsRepository.create({
      description,
      phone,
      title,
      latitude,
      longitude,
    });

    return { gym };
  }
}
