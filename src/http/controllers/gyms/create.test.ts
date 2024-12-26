import { app } from "app";
import {
  cleanupDatabase,
  setupApp,
  teardownApp,
} from "http/tests/e2e-test-utils";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await setupApp();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await teardownApp();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gymResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Gym",
        latitude: -14.235,
        longitude: -51.9253,
        description: null,
        phone: null,
      });

    expect(gymResponse.statusCode).toEqual(201);
  });
});
