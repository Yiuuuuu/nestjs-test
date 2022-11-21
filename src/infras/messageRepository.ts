import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { MessageEntity } from "../services/message/entities/message.entity";
import { MessageDocument, MessagePo } from "./schemas";

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(MessagePo.name)
    private readonly messageModel: Model<MessageDocument>
  ) {}

  async getMessageList() {
    try {
      const query = this.messageModel.find().sort({ createdAt: -1 });

      const result = await query.lean();

      return result;
    } catch (error) {
      throw new Error("Cannot find message list!");
    }
  }

  async getMessage(id: string) {
    try {
      const query = this.messageModel.findOne({ _id: id }).sort({ createdAt: -1 });

      const result = await query.lean();

      return result;
    } catch (error) {
      throw new Error("Cannot find message!");
    }
  }

  async createMessage(message: MessageEntity) {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async updateMessage(id: string, message: MessageEntity) {
    const updatedMessage = this.messageModel.findOneAndUpdate({ _id: id }, message);
    return updatedMessage.exec();
  }
}
