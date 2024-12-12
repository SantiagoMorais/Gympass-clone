import { CheckIn } from "@prisma/client";

export interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
}

export interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}
