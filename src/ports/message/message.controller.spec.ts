import { Test, TestingModule } from "@nestjs/testing";
import { getLoggerToken, PinoLogger } from "nestjs-pino";
import { MessageType } from "src/services/message/message.constants";
import { MessageEntity } from "src/services/message/message.entity";
import { MessageInvalidInputError, MessageNotFoundError } from "src/services/message/message.errors";
import { MessageService } from "../../services/message/message.service";
import { MessageController } from "./message.controller";
import { MessageDto } from "./message.dto";

jest.mock("src/services/message/message.service");

describe("MessageController (unit test)", () => {
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
      // mock
      const spiedGetMessageList = jest.spyOn(messageService, "getMessageList").mockResolvedValue([
        {
          id: "437e579377ec08fc838a4335",
          userCode: "1",
          profileId: "2",
          createdAt: new Date(),
          messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
        } as MessageEntity,
        {
          id: "637e579377ec08fc838a4338",
          userCode: "3",
          profileId: "4",
          createdAt: new Date(),
          messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
        } as MessageEntity,
      ]);

      // validate
      const result = await messageController.getMessageList();
      expect(Array.isArray(result)).toBeTruthy();
      result.forEach((item) => {
        expect(item).toBeInstanceOf(MessageDto);
      });
    });
  });

  describe("::getMessageById", () => {
    it("should return the message with the specific id", async () => {
      // mock
      const mockedObjectID = "637e578977ec08fc838a42e4";
      const spiedGetMessage = jest.spyOn(messageService, "getMessgae").mockResolvedValue({
        id: mockedObjectID,
        userCode: "1",
        profileId: "2",
        createdAt: new Date(),
        messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
      } as MessageEntity);

      // validate
      const result = await messageController.getMessage(mockedObjectID);
      expect(result).toBeInstanceOf(MessageDto);
    });

    it("should throw error when id is not valid", async () => {
      // mock
      const mockedObjectID = "123"; // Invalid ObjectID
      const spiedGetMessage = jest
        .spyOn(messageService, "getMessgae")
        .mockRejectedValue(new MessageInvalidInputError());

      // validate
      await expect(messageController.getMessage(mockedObjectID)).rejects.toThrow(MessageInvalidInputError);
    });

    it("should throw error when message is not found", async () => {
      // mock
      const mockedObjectID = "637e578977ec08fc838a42e4"; // Dummy random ObjectID
      const spiedGetMessage = jest
        .spyOn(messageService, "getMessgae")
        .mockRejectedValueOnce(new MessageNotFoundError());

      // validate
      await expect(messageController.getMessage(mockedObjectID)).rejects.toThrow(MessageNotFoundError);
    });
  });

  describe("::createMessage", () => {
    it("should craete message", async () => {
      // mock
      const date = new Date();
      const mockMessageDto = {
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
      } as MessageDto;
      const spiedGetMessage = jest.spyOn(messageService, "createMessage").mockResolvedValue({
        id: "437e579377ec08fc838a4335",
        profileId: "foo",
        userCode: "foo",
        createdAt: date,
        messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
      } as MessageEntity);

      // validate
      const result = await messageController.createMessage(mockMessageDto);
      await expect(result).toEqual({
        ...mockMessageDto,
        id: "437e579377ec08fc838a4335",
        messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
        createdAt: date,
      });
    });
  });

  describe("::updateMessage", () => {
    it("should update message with the specific id", async () => {
      // mock
      const mockedObjectID = "637e578977ec08fc838a42e4";
      const date = new Date();
      const mockMessageDto = {
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
      } as MessageDto;
      const spiedGetMessage = jest.spyOn(messageService, "updateMessage").mockResolvedValue({
        id: mockedObjectID,
        profileId: "foo",
        userCode: "foo",
        createdAt: date,
        messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
      } as MessageEntity);

      // validate
      const result = await messageController.updateMessage(mockedObjectID, mockMessageDto);
      await expect(result).toEqual({
        ...mockMessageDto,
        id: mockedObjectID,
        messageType: MessageType.CUSTOMER_MATCHING_REQUEST_REJECTED,
        createdAt: date,
      });
    });
    it("should throw error when id is not valid", async () => {
      // mock
      const mockedObjectID = "123"; // Invalid ObjectID
      const mockMessageDto = {
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
      } as MessageDto;
      const spiedGetMessage = jest
        .spyOn(messageService, "updateMessage")
        .mockRejectedValue(new MessageInvalidInputError());

      // validate
      await expect(messageController.updateMessage(mockedObjectID, mockMessageDto)).rejects.toThrow(
        MessageInvalidInputError
      );
    });
    it("should throw error when message is not fonud", async () => {
      // mock
      const mockedObjectID = "123"; // Invalid ObjectID
      const mockMessageDto = {
        profileId: "foo",
        userCode: "foo",
        messageType: MessageType.CUSTOMER_DELIVERY_ARRIVE_LASTMILE,
      } as MessageDto;
      const spiedGetMessage = jest
        .spyOn(messageService, "updateMessage")
        .mockRejectedValue(new MessageNotFoundError());

      // validate
      await expect(messageController.updateMessage(mockedObjectID, mockMessageDto)).rejects.toThrow(
        MessageNotFoundError
      );
    });
  });
});
