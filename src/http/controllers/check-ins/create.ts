import { FastifyReply, FastifyRequest } from "fastify";
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

  try {
    const checkInUseCase = makeCheckInUseCase();
    await checkInUseCase.execute({
      gymId,
      userId: req.user.sub,
      userLatitude,
      userLongitude,
    });

    return res.status(201).send();
  } catch (error) {
    console.error(`Error creating check-in:`, error);

    return res.status(400).send({
      message: "An error occurred while creating the check-in.",
    });
  }
};
