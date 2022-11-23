import { HttpException, HttpStatus } from "@nestjs/common";

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

export class LoggableError extends HttpException {
  logLevel: LogLevel;
  isLogged: boolean;

  constructor(httpStatus: HttpStatus, message?: string, level = LogLevel.ERROR) {
    super(message, httpStatus);
    this.logLevel = level;
  }
}
