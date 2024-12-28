import { app } from "app";
import request from "supertest";
import { cleanupDatabase } from "http/tests/e2e-test-utils";
import { prisma } from "lib/prisma";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Verify Check-In Gym",
        latitude: -14.235,
        longitude: -51.9253,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -14.235,
        longitude: -51.9253,
      });

    

    expect(response.statusCode).toEqual(201);
  });
});
