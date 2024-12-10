import { CheckInsRepository } from "repositories/check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";

let checkInsRespository: CheckInsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRespository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice a day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(async () => {
      await sut.execute({
        userId: "user-01",
        gymId: "gym-02",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice into different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-02",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
