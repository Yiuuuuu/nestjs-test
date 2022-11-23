import { HttpStatus } from "@nestjs/common";
import { LoggableError } from "src/utils/logger/logger.error";

export class MessageInvalidEntityError extends LoggableError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class MessageInvalidInputError extends LoggableError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class MessageNotFoundError extends LoggableError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class MessageUnknownError extends LoggableError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
