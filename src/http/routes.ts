import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";

export const appRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/sessions", authenticate)
  app.post("/register", register)
};
