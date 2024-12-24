import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authenticate } from "../users/authenticate";
import { register } from "../users/register";
import { profile } from "../users/profile";
import { verifyJWT } from "http/middlewares/verify-jwt";

export const usersRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/sessions", authenticate);
  app.post("/users", register);

  // Authenticated routes
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
