import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { validate } from "class-validator";
import { MessageInvalidInputError } from "src/services/message/message.errors";
import { MessageService } from "src/services/message/message.service";
import { MessageDto } from "./message.dto";
import { convertToMessageDto, convertToMessageEntity } from "./message.dto.converters";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() createMessageDto: MessageDto) {
    const errorList = await validate(createMessageDto);
    if (errorList.length > 0) {
      throw new MessageInvalidInputError(errorList.toString());
    }

    return convertToMessageDto(
      await this.messageService.createMessage(convertToMessageEntity(createMessageDto))
    );
  }

  @Get()
  async getMessageList() {
    const result = await this.messageService.getMessageList();

    return result.map(convertToMessageDto);
  }

  @Get(":id")
  async getMessage(@Param("id") id: string) {
    const result = await this.messageService.getMessgae(id);

    return convertToMessageDto(result);
  }

  @Patch(":id")
  async updateMessage(@Param("id") id: string, @Body() updateMessageDto: MessageDto) {
    const errorList = await validate(updateMessageDto);
    if (errorList.length > 0) {
      throw new MessageInvalidInputError(errorList.toString());
    }

    return convertToMessageDto(
      await this.messageService.updateMessage(id, convertToMessageEntity(updateMessageDto))
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
