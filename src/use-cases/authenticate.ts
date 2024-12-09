import bcrypt from "bcrypt";
import { UsersRepository } from "repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import {
  IAuthenticateUseCaseRequest,
  IAuthenticateUseCaseResponse,
} from "core/interfaces/authenticate-use-case";

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}
