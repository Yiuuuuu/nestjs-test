import { MessageType } from "src/services/message/message.constants";
import { MessageEntity } from "src/services/message/message.entity";
import { MessageDto } from "./message.dto";
import { plainToInstance } from "class-transformer";

export function convertToMessageEntity(message: MessageDto): MessageEntity {
  const entity: MessageEntity = new MessageEntity();
  entity.profileId = message.profileId;
  entity.userCode = message.userCode;
  entity.messageType = MessageType[message.messageType];
  entity.readAt = message.readAt;
  // entity.createdAt = new Date();

  return entity;
}
