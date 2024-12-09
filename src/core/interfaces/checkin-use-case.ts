import { CheckIn } from "@prisma/client";

export interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
}
export interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}
