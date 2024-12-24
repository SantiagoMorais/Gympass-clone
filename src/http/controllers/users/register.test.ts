import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "app";
import request from "supertest";
import {
  cleanupDatabase,
  setupApp,
  teardownApp,
} from "http/tests/e2e-test-utils";

describe("Register controller (e2e)", () => {
  beforeAll(async () => {
    await setupApp();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await teardownApp();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe1@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
