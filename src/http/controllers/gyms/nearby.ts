import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNearbyGymsUseCase } from "use-cases/factories/gym/make-fetch-nearby-gyms-use-case";
import { z } from "zod";

const nearbyGymsQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export const nearby = async (
  req: FastifyRequest<{ Querystring: z.infer<typeof nearbyGymsQuerySchema> }>,
  res: FastifyReply
) => {
  const { latitude, longitude } = req.query;
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  try {
    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return res.status(200).send({
      gyms,
    });
  } catch (error) {
    console.error("Error fetching nearby gyms:", error);

    return res.status(400).send({
      message: "An error occurred while fetching nearby gyms.",
    });
  }
};
