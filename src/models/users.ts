/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as db from "../db/query";
import config from "../config/config";
import * as uuidUtils from "uuid";
import * as bcrypt from "bcrypt";

export const validate = async (email: string, password: string) => {
  if (!email) {
    throw Error("only allowed using user email");
  }
  if (!password) {
    throw Error("only allowed using user password");
  } else {
    const { rows } = await db.queryWithParam(
      `SELECT * FROM "users" WHERE "email"=$1;`,
      [email]
    );
    const user: any = rows[0];
    if(user){
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw Error("invalid password");
      } else {
        return user;
      }
    }
    else{
      throw Error("invalid email");
    }
    
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  isadmin: boolean
) => {
  if (!email) {
    throw Error("only allowed using user email");
  }
  if (!password) {
    throw Error("only allowed using user password");
  }
  if (!name) {
    throw Error("only allowed using user name");
  } else {
    const hashedPassword = await bcrypt.hash(password, config.salt as number);
    const uuid = await uuidUtils.v4();

    const { rows } = await db.queryWithParam(
      `INSERT INTO "users" ("uuid","name","email","password","isadmin") VALUES ($1,$2,$3,$4,$5) RETURNING "id";`,
      [uuid, name, email, hashedPassword, isadmin]
    );
    const [row] = rows;
    return row;
  }
};
