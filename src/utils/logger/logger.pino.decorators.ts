import { HttpException } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";

import { LoggableError } from "./logger.error";

type LogArgsConverter = (...args: any[]) => any[];

/**
 * Use with cautions
 * ----
 *
 * pino logger hook will override the original function with an anonymous function.
 *
 * The overrided function is an anonymous function, i.e. empty function name,
 * may cause some issue with other library
 * e.g. nest swagger, function name is required to generate documenation
 *
 * Provide a disable flag for workaround,or don't use this auto logger hook
 * if you experenice some conflicts with other library
 *
 */
export function UseAutoPinoLogging(logArgsConverter?: LogArgsConverter) {
  const disabled = !!parseInt(process.env.DISABLE_AUTO_PINO_LOGGER_HOOK ?? "0", 10);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (disabled) {
      return descriptor;
    }

    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const logger: PinoLogger = (this as any).logger;

      if (!(logger instanceof PinoLogger)) {
        throw new Error("Pino logger not injected");
      }

      const loggableArgs = logArgsConverter ? args.map(logArgsConverter) : args;
      logger.info(`${propertyKey}(${Array(loggableArgs.length).fill("%o").join(", ")})`, ...loggableArgs);

      const handleError = (error: unknown) => {
        if (error instanceof LoggableError) {
          if (!error.isLogged) {
            logger[error.logLevel](
              `${propertyKey} - throw ${error.constructor.name ?? "error"}: %s`,
              error.message
            );
            error.isLogged = true;
          }
        } else if (error instanceof HttpException) {
          logger.error(
            `${propertyKey} - throw ${error.constructor.name ?? "HttpException"}: %s`,
            error.message
          );
        } else {
          logger.error(
            `${propertyKey} - throw unexpected ${(error as Error).constructor.name ?? "error"}: %s`,
            (error as Error).message
          );
        }
        throw error;
      };

      let result: unknown;
      try {
        result = originalFunction.apply(this, args);
      } catch (error) {
        handleError(error);
      }

      if (result && result instanceof Promise) {
        return result.catch(handleError);
      }

      return result;
    };

    return descriptor;
  };
}
