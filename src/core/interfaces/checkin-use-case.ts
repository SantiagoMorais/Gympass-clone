import { CheckIn } from "@prisma/client";

export interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
export interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}
