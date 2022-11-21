import { Module } from "@nestjs/common";
import { MessageService } from "../services/message/message.service";
import { MessageController } from "../ports/message.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MessagePo, MessageSchema } from "../infras/schemas";
import { MessageRepository } from "../infras/messageRepository";

@Module({
  imports: [MongooseModule.forFeature([{ name: MessagePo.name, schema: MessageSchema }])],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
})
export class MessageModule {}
