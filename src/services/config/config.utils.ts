import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { ConfigEnvVo } from "./config.env.vo";

import type { MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigInvalidEnvError } from "./config.errors";

export function validateConfigEnv(env: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ConfigEnvVo, env, { enableImplicitConversion: true });

  const errorList = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errorList.length > 0) {
    throw new ConfigInvalidEnvError(errorList.toString());
  }

  return validatedConfig;
}

export function createConfigVoByEnv() {
  const env = (process.env.NODE_ENV || "development") as never;

  const mongo = createMongooseModuleOptions({
    protocol: process.env.MONGO_PROTOCOL || "mongodb",
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST || "",
    dbName: process.env.MONGO_DB_NAME || "",
  });

  return {
    env,
    mongo,
  };
}

type CreateMongooseModuleOptionsArgs = {
  protocol: string;
  user?: string;
  password?: string;
  host: string;
  dbName: string;
  readPreference?: string;
};
function createMongooseModuleOptions({
  protocol,
  user,
  password,
  host,
  dbName,
  readPreference,
}: CreateMongooseModuleOptionsArgs) {
  return {
    uri: `${protocol}://${user ? `${user}:${password}@` : ""}${host}`,
    autoIndex: false,
    readPreference: readPreference ?? "primaryPreferred",
  } as MongooseModuleOptions;
}
