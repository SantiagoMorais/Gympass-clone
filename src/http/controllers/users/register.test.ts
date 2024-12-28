import { app } from "app";
import { cleanupDatabase } from "http/tests/e2e-test-utils";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("Register controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await app.close();
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
