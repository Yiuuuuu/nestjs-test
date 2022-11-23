import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import type { Document, Types } from "mongoose";

export type MessageDocument = MessagePo & Document<Types.ObjectId>;

export const MessageCollectionName = "messages";

@Schema()
export class MessagePo {
  @Prop()
  userCode?: string | null;

  @Prop()
  profileId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  readAt?: Date | null;

  @Prop()
  messageType: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessagePo);
