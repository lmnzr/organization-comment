import config from "../config/config";
import * as jwt from "jsonwebtoken";

export interface Payload {
  uuid: string;
  email: string;
}

export const createJwt = (payload: Payload): string => {
  const { uuid, email } = payload;
  return jwt.sign({ uuid, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
};

export const verifyJwt = (token: string): Payload => {
  return jwt.verify(token, config.jwtSecret) as Payload;
};
