import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { UserAlreadyExistsError } from "use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "use-cases/factories/user/make-register-use-case";
import { z } from "zod";

export const register: FastifyPluginAsyncZod = async (app) => {
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
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({ email, name, password });
      } catch (error) {
        if (error instanceof UserAlreadyExistsError)
          return res.status(409).send({ message: error.message });
        throw error;
      }

      res.status(201).send();
    }
  );
};
