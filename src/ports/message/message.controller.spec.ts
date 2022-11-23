import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { MessageService } from "src/services/message/message.service";
import { getLoggerToken, PinoLogger } from "nestjs-pino";
import { MessageController } from "./message.controller";
import { MessageInvalidInputError, MessageNotFoundError } from "src/services/message/message.errors";
import { MessageType } from "src/services/message/message.constants";

describe("MessageController (e2e)", () => {
  let messageController: MessageController;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getLoggerToken(MessageController.name), useValue: new PinoLogger({}) },
        MessageService,
      ],
      controllers: [MessageController],
    }).compile();

    messageController = module.get(MessageController);
    messageService = module.get(MessageService);

    expect(messageController).toBeDefined();
    expect(messageService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("::getMessageList", () => {
    it("should return an array of all messages", async () => {
      // TODO
      const response = await messageController.getMessageList();

      expect(response).toEqual(200);
    });
  });

  describe("::getMessageById", () => {
    it("should return the message with the specific id", async () => {
      // TODO
    });

    it("should throw error when id is not valid", async () => {
      const mockObjectId = "123"; // Invalid ObjectID
      await expect(messageController.getMessage(mockObjectId)).rejects.toThrow(MessageInvalidInputError);
    });

    it("should throw error when message is not found", async () => {
      const mockObjectId = "637a897ddb86db090aeb2685"; // Dummy random ObjectID
      await expect(messageController.getMessage(mockObjectId)).rejects.toThrow(MessageNotFoundError);
    });
  });

  describe("::createMessage", () => {
    it("should craete message", () => {
      // TODO
    });
  });

  describe("::updateMessage", () => {
    it("should update message with the specific id", async () => {
      // TODO
    });

    it("should throw error when id is not valid", async () => {
      const mockObjectId = "123"; // Invalid ObjectID
      const mockMessageDto = {
        id: "foo",
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
        readAt: null,
      };
      await expect(messageController.updateMessage(mockObjectId, mockMessageDto)).rejects.toThrow(
        MessageInvalidInputError
      );
    });

    it("should throw error when message is not fonud", async () => {
      const mockObjectId = "637a897ddb86db090aeb2685"; // Not exist ObjectID
      const mockMessageDto = {
        id: "foo",
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
        readAt: null,
      };
      await expect(messageController.updateMessage(mockObjectId, mockMessageDto)).rejects.toThrow(
        MessageNotFoundError
      );
    });
  });
});
