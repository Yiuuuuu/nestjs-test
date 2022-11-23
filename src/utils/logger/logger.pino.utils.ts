import { HttpException } from "@nestjs/common";

import { LoggableError } from "./logger.error";

import type { PinoLogger } from "nestjs-pino";

export function usePinoLoggerUtils(logger: PinoLogger, functionName: string) {
  const logArgs = useLogArgs(logger, functionName);
  const logFromError = useLogFromError(logger, functionName);

  return { logArgs, logFromError };
}

function useLogArgs(logger: PinoLogger, functionName: string) {
  const logArgs = (...args: any[]) => {
    const contextString = `${functionName}(${Array(args.length).fill("%o").join(", ")})`;
    logger.info(contextString, ...args);
  };

  return logArgs;
}

function useLogFromError(logger: PinoLogger, functionName: string) {
  const logFromError = (error: unknown) => {
    if (error instanceof LoggableError) {
      if (!error.isLogged) {
        logger[error.logLevel](
          `${functionName} - throw ${error.constructor.name ?? "error"}: %s`,
          error.message
        );
        error.isLogged = true;
      }
    } else if (error instanceof HttpException) {
      logger.error(`${functionName} - throw ${error.constructor.name ?? "HttpException"}: %s`, error.message);
    } else {
      logger.error(
        `${functionName} - throw unexpected ${(error as Error).constructor.name ?? "error"}: %s`,
        (error as Error).message
      );
    }
  };

  return logFromError;
}
