import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";
import { profile } from "./controllers/profile";

export const appRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/sessions", authenticate);
  app.post("/register", register);

  // authenticated
  app.get("/me", profile);
};
