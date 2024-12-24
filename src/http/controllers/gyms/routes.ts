import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifyJWT } from "http/middlewares/verify-jwt";
import { authenticate } from "../users/authenticate";

export const gymsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.addHook("onRequest", verifyJWT);
  app.post("/sessions", authenticate);
};
