import { FastifyInstance } from "fastify";
import { register } from "http/controllers/register";
import { authenticate } from "./controllers/authenticate";

export const appRoutes = async (app: FastifyInstance) => {
  app.register(register);
  app.register(authenticate);
};
