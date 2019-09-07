/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from "express";
import * as logger from "../logger/logger";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const message: any = {
    method: req.method,
    url: req.url,
    requestParams: req.params,
    requestBody: req.body,
    requestHeader: req.headers
  };
  logger.apiInfo(message);

  next();
};
