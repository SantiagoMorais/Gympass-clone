import { app } from "app";
import { cleanupDatabase } from "http/tests/e2e-test-utils";
import request from "supertest";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms by title", async () => {
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
