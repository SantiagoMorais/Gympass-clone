import { inMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: inMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      latitude: -14.235,
      longitude: -51.9253,
      description: null,
      phone: null,
    });

    await gymsRepository.create({
      title: "Far Gym",
      latitude: -14.325,
      longitude: -51.9253,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -14.235,
      userLongitude: -51.9253,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
