import type { Environment } from "./config.constants";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

export interface IConfigVo {
  env: Environment;
  mongo: MongooseModuleOptions;
}
