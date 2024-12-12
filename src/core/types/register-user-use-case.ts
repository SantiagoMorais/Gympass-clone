import { User } from "@prisma/client";
import { FastifyReply } from "fastify";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TRegisterUserUseCase = z.infer<typeof registerUserSchema>;

export type TRegisterUseCaseResponse = { user: User };
