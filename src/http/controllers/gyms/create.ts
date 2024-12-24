import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateGymUseCase } from "use-cases/factories/gym/make-create-gym-use-case";
import { z } from "zod";

const createGymSchema = z.object({
  title: z.string(),
  description: z.string().email().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export const create = async (
  req: FastifyRequest<{ Body: z.infer<typeof createGymSchema> }>,
  res: FastifyReply
) => {
  const { description, latitude, longitude, phone, title } = req.body;
  const registerUseCase = makeCreateGymUseCase();

  await registerUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  });

  res.status(201).send();
};
