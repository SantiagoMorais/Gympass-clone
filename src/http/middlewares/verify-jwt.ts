import { FastifyReply, FastifyRequest } from "fastify";

export const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await req.jwtVerify(); // this function:
    // 1. Search the token inside of my headers;
    // 2. If the token exists, it'll be validated;
    // 3. If the token doesn't exist, the code below won't run
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
