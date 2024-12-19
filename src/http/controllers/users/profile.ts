import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "use-cases/factories/user/make-get-user-profile-use-case";

export const profile = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  });

  const { password_hash, ...userWithoutPassword } = user;

  return res.status(200).send({
    user: userWithoutPassword,
  });
};
