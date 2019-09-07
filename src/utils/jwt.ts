import config from "../config/config";
import * as jwt from "jsonwebtoken";

export interface Payload {
  uuid: string;
  email: string;
}

export const createJwt = (payload: Payload): string => {
  const { uuid, email } = payload;
  console.log(config.jwtSecret);
  return jwt.sign({ uuid, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
};
