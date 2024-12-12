import { CheckIn } from "@prisma/client";

export interface IValidateCheckInUseCaseRequest {
  checkInId: string;
}

export interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}
