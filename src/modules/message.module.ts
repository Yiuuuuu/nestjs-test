import { Module } from "@nestjs/common";
import { MessageService } from "../services/message/message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MessagePo, MessageSchema } from "src/infras/message/message.schema";
import { MessageRepository } from "src/infras/message/message.repository";
import { MessageController } from "src/ports/message/message.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: MessagePo.name, schema: MessageSchema }])],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
})
export class MessageModule {}
