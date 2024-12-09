import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "use-cases/authenticate";
import { InvalidCredentialsError } from "use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "use-cases/factories/make-authenticate-use-case";
import { z } from "zod";

export const authenticate: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/sessions",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body;

      try {
        const authenticateUseCase = makeAuthenticateUseCase();
        await authenticateUseCase.execute({ email, password });
      } catch (error) {
        if (error instanceof InvalidCredentialsError)
          return res.status(400).send({ message: error.message });
        throw error;
      }

      res.status(200).send();
    }
  );
};
