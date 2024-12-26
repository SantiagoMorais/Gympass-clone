import { FastifyInstance } from "fastify";
import { verifyJWT } from "http/middlewares/verify-jwt";
import { create } from "./create";

export const checkInsRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms/:gymId/check-ins", create);
};
