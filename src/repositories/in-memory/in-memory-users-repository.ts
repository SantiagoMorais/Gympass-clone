import { User, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { UsersRepository } from "repositories/users-repository";

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: String) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role ? data.role : "MEMBER",
    };

    this.items.push(user);

    return user;
  }
}
