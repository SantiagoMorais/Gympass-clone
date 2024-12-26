import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "use-cases/errors/user-already-exists-error";
import { makeCheckInUseCase } from "use-cases/factories/check-in/make-check-in-use-case";
import { z } from "zod";

const createCheckInBodySchema = z.object({
  userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
  userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
});

const createCheckInParamsSchema = z.object({
  gymId: z.string().uuid(),
});

export const create = async (
  req: FastifyRequest<{
    Body: z.infer<typeof createCheckInBodySchema>;
    Params: z.infer<typeof createCheckInParamsSchema>;
  }>,
  res: FastifyReply
) => {
  const { userLatitude, userLongitude } = req.body;
  const { gymId } = req.params;

  const checkInUseCase = makeCheckInUseCase();
  await checkInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude,
    userLongitude,
  });

  return res.status(201).send();
};
