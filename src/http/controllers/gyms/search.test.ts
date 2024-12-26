import { app } from "app";
import {
  cleanupDatabase,
  setupApp,
  teardownApp,
} from "http/tests/e2e-test-utils";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await setupApp();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await teardownApp();
  });

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        latitude: -14.235,
        longitude: -51.9253,
        description: null,
        phone: null,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        latitude: -14.235,
        longitude: -51.9253,
        description: null,
        phone: null,
      });

    const gymResponse = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        query: "TypeScript",
        page: 1,
      });

    expect(gymResponse.statusCode).toEqual(200);
    expect(gymResponse.body.gyms).toHaveLength(1);
    expect(gymResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: "TypeScript Gym",
      }),
    ]);
  });
});
