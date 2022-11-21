import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { MessageType } from "./message.constants";

export class MessageEntity {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userCode?: string;

  @IsString()
  profileId: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  readAt?: Date;

  @IsEnum(MessageType)
  messageType: MessageType;
}
