import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as jwtUtils from "../utils/jwt";

export const jwtCheck = (
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
    jwtPayload = jwt.verify(token, config.jwtSecret) as jwtUtils.Payload;
    res.locals.jwtPayload = jwtPayload;

    const newToken = jwtUtils.createJwt(jwtPayload);
    req.params.uuid = jwtPayload.uuid;
    req.params.email = jwtPayload.email;
    res.setHeader("token", newToken);
  } catch (error) {
    //If token is not valid, use anonymous
    req.params.uuid = "";
    req.params.email = "anonymous";
  }

  next();
};
