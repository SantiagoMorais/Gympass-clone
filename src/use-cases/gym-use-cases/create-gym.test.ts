import { describe } from "node:test";
import { inMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: inMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      title: "Solid Gym",
      latitude: -14.235,
      longitude: -51.9253,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
