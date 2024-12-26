import { FastifyReply, FastifyRequest } from "fastify";
import { makeValidateCheckInUseCase } from "use-cases/factories/check-in/make-validate-check-in-use-case";
import { z } from "zod";

const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid(),
});

export const validate = async (
  req: FastifyRequest<{ Params: z.infer<typeof validateCheckInParamsSchema> }>,
  res: FastifyReply
) => {
  const { checkInId } = req.params;

  const validateCheckInUseCase = makeValidateCheckInUseCase();
  await validateCheckInUseCase.execute({ checkInId });

  return res.status(204).send();
};
