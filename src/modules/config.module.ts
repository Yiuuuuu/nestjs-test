import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule as NestJsConfigModule } from "@nestjs/config";

import { ConfigService } from "../services/config/config.service";
import { createConfigVoByEnv, validateConfigEnv } from "../services/config/config.utils";

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ConfigModule,
      imports: [
        NestJsConfigModule.forRoot({
          load: [createConfigVoByEnv],
          validate: validateConfigEnv,
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
