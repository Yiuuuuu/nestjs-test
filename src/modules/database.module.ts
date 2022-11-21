import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ConfigService } from "../services/config/config.service";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            ...configService.get("mongo"),
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
