import { CheckInsRepository } from "repositories/check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";

let checkInsRespository: CheckInsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRespository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
