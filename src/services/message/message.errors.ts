import { LoggableError } from "src/utils/logger/logger.error";

export class MessageInvalidEntityError extends LoggableError {}
export class MessageInvalidInputError extends LoggableError {}
export class MessageNotFoundError extends LoggableError {}
export class MessageUnknownError extends LoggableError {}
