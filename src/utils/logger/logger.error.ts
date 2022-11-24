export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

export class LoggableError extends Error {
  logLevel: LogLevel;
  isLogged: boolean;

  constructor(message?: string, level = LogLevel.ERROR) {
    super(message);
    this.logLevel = level;
  }
}
