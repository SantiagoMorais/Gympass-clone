import { User } from "@prisma/client";

export interface IRegisterUseCaseResponse {
  user: User;
}
