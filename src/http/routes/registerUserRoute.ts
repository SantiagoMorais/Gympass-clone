import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { registerUser } from "http/functions/registerUser";
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

      return res.status(201).send();
    }
  );
};
