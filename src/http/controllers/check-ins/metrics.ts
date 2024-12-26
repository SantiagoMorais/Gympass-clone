import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "use-cases/factories/check-in/make-get-user-metrics-use-case";

export const metrics = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkInsCount,
  });
};
