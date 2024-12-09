import { User } from "@prisma/client";

export interface IGetUserProfileUseCaseRequest {
  userId: string;
}

export interface IGetUserProfileUseCaseResponse {
  user: User;
}
