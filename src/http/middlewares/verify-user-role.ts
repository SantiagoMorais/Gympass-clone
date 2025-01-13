import { IVerifyUserRole } from "core/interfaces/verify-user-role";
import { FastifyReply, FastifyRequest } from "fastify";

export const verifyUserRole = ({ roleToVerify }: IVerifyUserRole) => {
  return (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify)
      return res.status(401).send({ message: "Unauthorized!" });
  };
};
