import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Types } from "mongoose";
import { MessageEntity } from "src/services/message/message.entity";
import { MessageInvalidInputError, MessageUnknownError } from "src/services/message/message.errors";
import { MessageDocument, MessagePo } from "./message.schema";

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(MessagePo.name)
    private readonly messageModel: Model<MessageDocument>
  ) {}

  async createMessage(message: MessageEntity) {
    try {
      const createdMessage = new this.messageModel(message);
      return createdMessage.save();
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async getMessageList() {
    try {
      return await this.messageModel.find().sort({ _id: -1 }).lean();
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async getMessage(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new MessageInvalidInputError("ID format is not correct!");
      return await this.messageModel.findOne({ _id: id }).lean();
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async updateMessage(id: string, message: MessageEntity) {
    try {
      console.log("IHIH");
      if (!Types.ObjectId.isValid(id)) throw new MessageInvalidInputError("ID format is not correct!");
      const updatedMessage = this.messageModel.findOneAndUpdate({ _id: id }, message, { new: true });
      return updatedMessage.exec();
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }
}
