import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
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

  async createMessage(message: MessageEntity): Promise<MessageEntity> {
    try {
      const result = await new this.messageModel(message).save();
      return plainToInstance(MessageEntity, {
        id: result._id,
        userCode: result.userCode,
        profileId: result.profileId,
        createdAt: result.createdAt,
        messageType: result.messageType,
      });
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async getMessageList(): Promise<MessageEntity[]> {
    try {
      const result = await this.messageModel.find().sort({ _id: -1 }).lean();
      const res = result.map((item) => {
        return plainToInstance(MessageEntity, {
          id: item._id,
          userCode: item.userCode,
          profileId: item.profileId,
          createdAt: item.createdAt,
          messageType: item.messageType,
        });
      });
      return res;
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async getMessage(id: string): Promise<MessageEntity> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException("ID format is not correct!");
    try {
      const result = await this.messageModel.findOne({ _id: id }).lean();
      return plainToInstance(MessageEntity, {
        id: result._id,
        userCode: result.userCode,
        profileId: result.profileId,
        createdAt: result.createdAt,
        messageType: result.messageType,
      });
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }

  async updateMessage(id: string, message: MessageEntity): Promise<MessageEntity> {
    if (!Types.ObjectId.isValid(id)) throw new MessageInvalidInputError("ID format is not correct!");
    try {
      const updatedMessage = this.messageModel.findOneAndUpdate({ _id: id }, message, { new: true });
      const result = await updatedMessage.exec();
      return plainToInstance(MessageEntity, {
        id: result._id,
        userCode: result.userCode,
        profileId: result.profileId,
        createdAt: result.createdAt,
        messageType: result.messageType,
      });
    } catch (error) {
      throw new MessageUnknownError((error as Error).message);
    }
  }
}
