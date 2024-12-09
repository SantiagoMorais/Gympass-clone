import { User } from "@prisma/client";

export interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUseCaseResponse {
  user: User;
}
