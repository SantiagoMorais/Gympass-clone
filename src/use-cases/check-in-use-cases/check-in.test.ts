import { Decimal } from "@prisma/client/runtime/library";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { inMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { MaxNumberOfCheckInsError } from "use-cases/errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "use-cases/errors/max-distance-error";

let checkInsRespository: InMemoryCheckInsRepository;
let gymsRepository: inMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    gymsRepository = new inMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRespository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      description: null,
      latitude: -14.235,
      longitude: -51.9253,
      phone: null,
      title: "Test Gym",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -14.235,
      userLongitude: -51.9253,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice a day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -14.235,
      userLongitude: -51.9253,
    });

    expect(async () => {
      await sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -14.235,
        userLongitude: -51.9253,
      });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice into different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -14.235,
      userLongitude: -51.9253,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -14.235,
      userLongitude: -51.9253,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in far from the gym", async () => {
    gymsRepository.gyms.push({
      id: "gym-02",
      description: "",
      latitude: new Decimal(40.748817),
      longitude: new Decimal(-73.985428),
      phone: "",
      title: "Test Gym",
    }); // Empire State Building, NY, USA

    expect(async () => {
      await sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: 51.507351,
        userLongitude: -0.127758,
      }); // Buckingham Palace, London, United Kingdom
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
