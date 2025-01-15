import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJWT from "@fastify/jwt";
import { env } from "env";
import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { checkInsRoutes } from "http/controllers/check-ins/routes";
import { gymsRoutes } from "http/controllers/gyms/routes";
import { usersRoutes } from "http/controllers/users/routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res
      .status(400)
      .send({ message: "Validation error", issues: error.message });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: "Internal server error." });
});
