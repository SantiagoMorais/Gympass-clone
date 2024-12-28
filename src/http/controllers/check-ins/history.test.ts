import { app } from "app";
import request from "supertest";
import { cleanupDatabase } from "http/tests/e2e-test-utils";
import { prisma } from "lib/prisma";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Check-in History (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list the history of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -14.235,
        longitude: -51.9253,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
      expect.objectContaining({ user_id: user.id, gym_id: gym.id }),
    ]);
  });
});
