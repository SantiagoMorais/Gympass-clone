import { FastifyReply } from "fastify";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type TRegisterUserSchema = z.infer<typeof registerUserSchema>

export interface TRegisterUser extends TRegisterUserSchema {
    res: FastifyReply
}