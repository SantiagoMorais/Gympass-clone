import { hash } from "bcrypt";
import { TRegisterUser } from "core/types/registerUser";
import { UsersRepository } from "repositories/users-repository";

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: TRegisterUser) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new Error("E-mail already exists.");

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    });
  }
}
