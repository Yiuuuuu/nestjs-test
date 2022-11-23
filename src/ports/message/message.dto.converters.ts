import { plainToInstance } from "class-transformer";
import { MessageEntity } from "src/services/message/message.entity";
import { MessageDto } from "./message.dto";

export function convertToMessageEntity(message: MessageDto): MessageEntity {
  return plainToInstance(MessageEntity, {
    id: message.id,
    userCode: message.userCode,
    profileId: message.profileId,
    readAt: message.readAt,
    createdAt: message.createdAt,
    messageType: message.messageType,
  });
}

export function convertToMessageDto(message: MessageEntity): MessageDto {
  return plainToInstance(MessageDto, {
    id: message.id,
    userCode: message.userCode,
    profileId: message.profileId,
    readAt: message.readAt,
    createdAt: message.createdAt,
    messageType: message.messageType,
  });
}
