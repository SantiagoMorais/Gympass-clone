import { FastifyInstance } from "fastify";
import { registerUserRoute } from "http/routes/registerUserRoute";

export const appRoutes = async (app: FastifyInstance) => {
  app.register(registerUserRoute);
};
