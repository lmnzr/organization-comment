import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export interface Payload {
  userId: number;
  userName: string;
}

export const createJwt = (payload: Payload): string => {
  const { userId, userName } = payload;
  return jwt.sign({ userId, userName }, config.jwtSecret, {
    expiresIn: "1h"
  });
};

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //Get the jwt token from the
  const token = req.headers["auth"] as string;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret) as Payload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  
  const newToken = createJwt(jwtPayload);
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
