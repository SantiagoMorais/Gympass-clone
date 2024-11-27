import { hash } from "bcrypt";
import { TRegisterUser } from "core/types/registerUser";
import { prisma } from "lib/prisma";

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ email, name, password }: TRegisterUser) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) throw new Error("E-mail already exists.");

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    });
  }
}
