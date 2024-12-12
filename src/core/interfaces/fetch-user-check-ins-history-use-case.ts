import { CheckIn } from "@prisma/client";

export interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}
