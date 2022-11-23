import { HttpStatus, Injectable } from "@nestjs/common";
import { MessageRepository } from "src/infras/message/message.repository";
import { MessageEntity } from "./message.entity";
import { MessageNotFoundError } from "./message.errors";

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessageRepository) {}

  async createMessage(message: MessageEntity) {
    return await this.messageRepo.createMessage(message);
  }

  async getMessageList() {
    return await this.messageRepo.getMessageList();
  }

  async getMessgae(id: string) {
    const result = await this.messageRepo.getMessage(id);

    if (!result) throw new MessageNotFoundError("Cannot find a message with this ID!");

    return result;
  }

  async updateMessage(id: string, message: MessageEntity) {
    const result = await this.messageRepo.updateMessage(id, message);

    if (!result) throw new MessageNotFoundError("Cannot find a message with this ID!");

    return result;
  }
}
