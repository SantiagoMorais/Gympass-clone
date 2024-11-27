import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { registerUser } from "use-cases/registerUser";
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
    async (req, res) => {
      const { name, email, password } = req.body;

      try {
        await registerUser({ email, name, password });
        res.status(201).send();
      } catch (error) {
        return res.status(409).send();
      }
    }
  );
};
