import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

import helmet from "helmet";

import { Logger } from "nestjs-pino";

import { INestApplication, ValidationPipe } from "@nestjs/common";

let app: INestApplication;

export async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule, { cors: true, bufferLogs: true });

    app.useLogger(app.get(Logger));

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      })
    );
    app.use(helmet({ contentSecurityPolicy: false }));
  }
  return app;
}
