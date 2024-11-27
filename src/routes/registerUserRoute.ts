import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { registerUser } from "functions/registerUser";
import { z } from "zod";

export const registerUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    (req, res) => {
      const { name, email, password } = req.body;

      registerUser({ email, name, password, res });
    }
  );
};
