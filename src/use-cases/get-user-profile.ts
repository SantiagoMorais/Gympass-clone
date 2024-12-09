import {
  IGetUserProfileUseCaseRequest,
  IGetUserProfileUseCaseResponse,
} from "core/interfaces/get-user-profile-use-case";
import { UsersRepository } from "repositories/users-repository";
import { ResourceNorFoundError } from "./errors/resource-not-found-error";

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ResourceNorFoundError();

    return { user };
  }
}
