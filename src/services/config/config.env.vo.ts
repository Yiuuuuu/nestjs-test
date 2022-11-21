import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { Environment } from "./config.constants";

export class ConfigEnvVo {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  MONGO_PROTOCOL: string;

  @IsNotEmpty()
  @IsString()
  MONGO_USER: string;

  @IsNotEmpty()
  @IsString()
  MONGO_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  MONGO_HOST: string;

  @IsNotEmpty()
  @IsString()
  MONGO_DB_NAME: string;
}
