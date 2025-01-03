import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifyJWT } from "http/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export const gymsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.addHook("onRequest", verifyJWT);
  
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
  
  app.post("/gyms", create);
};
