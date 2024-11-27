import fastifyCors from "@fastify/cors";
import { env } from "env";
import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { appRoutes } from "http/routes";
import { ZodError } from "zod";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
});

app.register(appRoutes);
app.setErrorHandler((error, _, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(400).send({ message: "Validation error", issues: error.message });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: "Internal server error." });
});
