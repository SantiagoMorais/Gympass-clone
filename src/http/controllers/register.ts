import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "use-cases/factories/user/make-register-use-case";
import { z } from "zod";

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (
  req: FastifyRequest<{ Body: z.infer<typeof registerBodySchema> }>,
  res: FastifyReply
) => {
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
};
