import { INestApplication } from "@nestjs/common";
import { bootstrap } from "./bootstrap";

let app: INestApplication;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3333);
// }
// bootstrap();

{
  (async () => {
    if (!app) {
      app = await bootstrap();
    }

    const nodePort = parseInt(process.env.NODE_PORT ?? "", 10);
    await app.listen(!isNaN(nodePort) ? nodePort : 3333);
  })();
}
