import * as winston from "winston";

export enum Type {
  DB = "db",
  API = "api",
  SERVER = "server",
  DEBUG = "debug"
}

class LoggerFactory {
  public logger: winston.Logger;

  constructor(type: Type) {
    const { combine, timestamp, printf, colorize } = winston.format;

    const env = process.env.NODE_ENV || "development";

    this.logger = winston.createLogger({
      level: "info",
      format: combine(
        timestamp(),
        printf(info => {
          const json: any = {
            timestamp: info.timestamp,
            level: info.level,
            message: info.message
          };

          return JSON.stringify(json);
        })
      )
    });

    if (env === "development" || type === Type.DEBUG) {
      this.logger.add(
        new winston.transports.Console({
          format: combine(
            colorize(),
            timestamp(),
            printf(info => {
              return `${info.timestamp}::[${
                info.level
              }-${type}]:${JSON.stringify(info.message)}`;
            })
          )
        })
      );
    }

    if (type !== Type.DEBUG) {
      this.logger.add(
        new winston.transports.File({
          filename: `log/${type}All.log`
        })
      );
      this.logger.add(
        new winston.transports.File({
          filename: `log/${type}Error.log`,
          level: "error"
        })
      );
    }
  }
}

export function createLogger(type: Type): winston.Logger {
  return new LoggerFactory(type).logger as winston.Logger;
}

export function printDebug(): winston.Logger {
  return new LoggerFactory(Type.DEBUG).logger as winston.Logger;
}
