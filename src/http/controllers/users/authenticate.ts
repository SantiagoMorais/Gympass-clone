import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "use-cases/factories/user/make-authenticate-use-case";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authenticate = async (
  req: FastifyRequest<{ Body: z.infer<typeof authenticateBodySchema> }>,
  res: FastifyReply
) => {
  const { email, password } = req.body;

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    res.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return res.status(400).send({ message: error.message });
    throw error;
  }
};
