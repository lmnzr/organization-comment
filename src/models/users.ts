/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as db from "../db/query";
import config from "../config/config";
import * as uuidUtils from "uuid";
import * as bcrypt from "bcrypt";

export const validate = async (uuid: string, email: string) => {
  const { rows } = await db.queryWithParam(
    "SELECT * FROM users WHERE uuid=$1;",
    [uuid]
  );
  const user: any = rows[0];
  if (user.email !== email) {
    throw Error("invalid request");
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  isadmin: boolean
) => {
  const hashedPassword = await bcrypt.hash(password, config.salt);
  const uuid = await uuidUtils.v4();

  const { rows } = await db.queryWithParam(
    "INSERT INTO users(uuid,name,email,password,isadmin) VALUES ($1,$2,$3,$4,$5) RETURNING id;",
    [uuid, name, email, hashedPassword, isadmin]
  );
  const [row] = rows;
  return row;
};
