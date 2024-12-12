import bcrypt from "bcrypt";
import { inMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { GetUserProfile } from "./get-user-profile";

let usersRepository: inMemoryUsersRepository;
let sut: GetUserProfile;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository();
    sut = new GetUserProfile(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      email: "jondoe@mail.com",
      name: "John Doe",
      password_hash: await bcrypt.hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(
      async () =>
        await sut.execute({
          userId: "non-existent-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
