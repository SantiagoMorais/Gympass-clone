import { hash } from "bcrypt";

import {
  TRegisterUseCaseResponse,
  TRegisterUserUseCase,
} from "core/types/register-user-use-case";
import { UsersRepository } from "repositories/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: TRegisterUserUseCase): Promise<TRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
