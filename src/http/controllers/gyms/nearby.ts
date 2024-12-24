import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNearbyGymUseCase } from "use-cases/factories/gym/make-fetch-nearby-gyms-use-case";
import { z } from "zod";

const nearbyGymsQuerySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export const nearby = async (
  req: FastifyRequest<{ Querystring: z.infer<typeof nearbyGymsQuerySchema> }>,
  res: FastifyReply
) => {
  const { latitude, longitude } = req.query;
  const fetchNearbyGyms = makeFetchNearbyGymUseCase();

  const { gyms } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(200).send({
    gyms,
  });
};
