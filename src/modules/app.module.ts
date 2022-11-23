import { Module } from "@nestjs/common";
import { ConfigModule } from "src/modules/config.module";
import { AppController } from "src/ports/app/app.controller";
import { AppService } from "src/services/app/app.service";
import { DatabaseModule } from "./database.module";
import { MessageModule } from "./message.module";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [LoggerModule.forRoot(), ConfigModule.forRoot(), DatabaseModule.forRoot(), MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
