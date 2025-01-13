import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "use-cases/errors/invalid-credentials-error";
import { makeCreateGymUseCase } from "use-cases/factories/gym/make-create-gym-use-case";
import { z, ZodError } from "zod";

const createGymSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => Math.abs(value) <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.number().refine((value) => Math.abs(value) <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { title, description, phone, latitude, longitude } =
      createGymSchema.parse(req.body);
    const createGymUseCase = makeCreateGymUseCase();

    await createGymUseCase.execute({
      description,
      latitude,
      longitude,
      phone,
      title,
    });

    return res.status(201).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({
        message: "Validation failed",
        issues: error.errors,
      });
    } else if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
