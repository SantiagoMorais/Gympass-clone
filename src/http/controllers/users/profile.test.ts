import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "app";
import request from "supertest";
import { createAndAuthenticateUser } from "utils/test/create-and-authenticate-user";
import {
  cleanupDatabase,
  setupApp,
  teardownApp,
} from "http/tests/e2e-test-utils";

describe("Profile controller (e2e)", () => {
  beforeAll(async () => {
    await setupApp();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await teardownApp();
  });

  it("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });
});
