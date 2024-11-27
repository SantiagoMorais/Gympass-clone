import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsersRepository } from "repositories/prisma-users-repository";
import { RegisterUseCase } from "use-cases/register";
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
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        await registerUseCase.execute({ email, name, password });
        res.status(201).send();
      } catch (error) {
        return res.status(409).send();
      }
    }
  );
};
