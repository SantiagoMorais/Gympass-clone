import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "use-cases/factories/check-in/make-fetch-user-check-ins-history-use-case";
import { z } from "zod";

const historyCheckInQuerySchema = z.object({
  page: z.number().int().positive(),
});

export const history = async (
  req: FastifyRequest<{
    Querystring: z.infer<typeof historyCheckInQuerySchema>;
  }>,
  res: FastifyReply
) => {
  const { page } = req.query;

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkIns,
  });
};
