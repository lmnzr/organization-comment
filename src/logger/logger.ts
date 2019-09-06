import * as winston from "winston";
import * as loggerFactory from "./loggerFactory";

export function serverInfo(message: any): winston.Logger {
  return loggerFactory.createLogger(loggerFactory.Type.SERVER).info(message);
}

export function serverError(message: any): winston.Logger {
  return loggerFactory.createLogger(loggerFactory.Type.SERVER).error(message);
}

export function dbInfo(message: any): winston.Logger {
  return loggerFactory.createLogger(loggerFactory.Type.DB).info(message);
}

export function dbError(message: any): winston.Logger {
  return loggerFactory.createLogger(loggerFactory.Type.DB).error(message);
}

export function apiInfo(message: any): winston.Logger {
  return loggerFactory.createLogger(loggerFactory.Type.API).info(message);
}

export function apiError(message: any): winston.Logger {
    return loggerFactory.createLogger(loggerFactory.Type.API).error(message);
  }
