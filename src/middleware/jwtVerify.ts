import { Request, Response, NextFunction } from "express";
import * as jwtUtils from "../utils/jwt";
import * as logger from "../logger/logger";

export const jwtVerify = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let jwtPayload;
  //Get the jwt token from the
  let token = req.headers["authorization"] as string;
  if (token) {
    token = token.split("Bearer ")[1];
  }

  //Try to validate the token and get data
  try {
    jwtPayload = jwtUtils.verifyJwt(token);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    logger.serverError(error.message);
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ error: "unauthorized access" });
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
