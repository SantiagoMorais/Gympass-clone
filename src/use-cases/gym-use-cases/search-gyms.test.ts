import { inMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: inMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Solid Gym",
      latitude: -14.235,
      longitude: -51.9253,
      description: null,
      phone: null,
    });

    await gymsRepository.create({
      title: "Node Gym",
      latitude: -14.235,
      longitude: -51.9253,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({ page: 1, query: "Node" });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Node Gym" })]);
  });

  it("Should be able to fetched paginates gyms", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym-${i}`,
        latitude: -14.235,
        longitude: -51.9253,
        description: null,
        phone: null,
      });
    }

    const { gyms } = await sut.execute({ page: 2, query: "Gym" });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym-21" }),
      expect.objectContaining({ title: "Gym-22" }),
    ]);
  });
});
