import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  profileId: string;

  @IsOptional()
  @IsString()
  userCode: string;

  @IsOptional()
  @IsString()
  messageType: string;

  @IsOptional()
  @IsDate()
  readAt: Date;
}
