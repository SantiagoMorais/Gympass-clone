import { Gym } from "@prisma/client";
import { z } from "zod";

const registerGymSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
});

export type TGymUseCaseRequest = z.infer<typeof registerGymSchema>;

export type TGymResponse = { gym: Gym };
