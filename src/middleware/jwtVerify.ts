import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as jwtUtils from "../utils/jwt";

export const jwtVerify = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //Get the jwt token from the
  let token = req.headers["authorization"] as string;
  token = token.split("Bearer ")[1];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret) as jwtUtils.Payload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request

  const newToken = jwtUtils.createJwt(jwtPayload);
  req.params.uuid = jwtPayload.uuid;
  req.params.email = jwtPayload.email;
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
