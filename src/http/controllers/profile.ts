import { log } from "console";
import { FastifyReply, FastifyRequest } from "fastify";

export const profile = async (req: FastifyRequest, res: FastifyReply) => {
  await req.jwtVerify(); // this function:
  // 1. Search the token inside of my headers;
  // 2. If the token exists, it'll be validated;
  // 3. If the token doesn't exist, the code below won't run

  return res.status(200).send();
};
