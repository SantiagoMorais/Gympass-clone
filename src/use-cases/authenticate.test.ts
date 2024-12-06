import { inMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Autheticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await bcrypt.hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it.only("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it.only("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password_hash: await bcrypt.hash("123456", 6),
      });

    expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "1234567",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
