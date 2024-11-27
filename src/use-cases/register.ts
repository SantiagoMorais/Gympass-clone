import { hash } from "bcrypt";
import { TRegisterUser } from "core/types/registerUser";
import { UsersRepository } from "repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: TRegisterUser) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    });
  }
}
