import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import type { Document, Types } from "mongoose";

export type MessageDocument = MessagePo & Document<Types.ObjectId>;

export const MessageCollectionName = "messages";

class UserCode {
  userCode: string | null;
}

class ReadAt {
  readAt: Date | null;
}

@Schema()
export class MessagePo {
  @Prop(UserCode)
  userCode?: UserCode;

  @Prop()
  profileId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  readAt?: ReadAt;

  @Prop()
  messageType: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessagePo);
