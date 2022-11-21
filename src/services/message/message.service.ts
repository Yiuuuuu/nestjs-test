import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageType } from "./entities/message.constants";
import { MessageEntity } from "./entities/message.entity";
import { MessageRepository } from "../../infras/messageRepository";

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessageRepository) {}

  create(message: CreateMessageDto) {
    const messageEntity = this.convertToMessage(message);
    return this.messageRepo.createMessage(messageEntity);
  }

  findAll() {
    return this.messageRepo.getMessageList();
  }

  findOne(id: string) {
    return this.messageRepo.getMessage(id);
  }

  update(id: string, message: UpdateMessageDto) {
    const messageEntity = this.convertToMessage(message);
    return this.messageRepo.updateMessage(id, messageEntity);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
  convertToMessage(message: CreateMessageDto | UpdateMessageDto): MessageEntity {
    const entity: MessageEntity = new MessageEntity();
    entity.profileId = message.profileId;
    entity.userCode = message.userCode;
    entity.messageType = MessageType[message.messageType];
    entity.readAt = message.readAt;
    entity.createdAt = new Date();

    return entity;
  }
}
