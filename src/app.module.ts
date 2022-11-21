import { Module } from "@nestjs/common";
import { ConfigModule } from "./modules/config.module";
import { DatabaseModule } from "./modules/database.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from "./modules/message.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    MessageModule,
    // (() => {
    //   // return MongooseModule.forRoot(getMongoDbUrl()!);
    //   return MongooseModule.forRoot(
    //     "mongodb+srv://admin:admin@nextjs-cluster.uzlya.mongodb.net/?retryWrites=true&w=majority"
    //   );
    // })(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// mongodb+srv://admin:admin@nextjs-cluster.uzlya.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://admin:admin@message.ts6uujd.mongodb.net/test
