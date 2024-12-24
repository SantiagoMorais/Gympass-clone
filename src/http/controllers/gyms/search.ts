import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateGymUseCase } from "use-cases/factories/gym/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "use-cases/factories/gym/make-search-gyms-use-case";
import { z } from "zod";

const searchGymQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
});

export const search = async (
  req: FastifyRequest<{ Querystring: z.infer<typeof searchGymQuerySchema> }>,
  res: FastifyReply
) => {
  const { page, query } = req.query;
  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    page,
    query,
  });

  return res.status(200).send({
    gyms,
  });
};
