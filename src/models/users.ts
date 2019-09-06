import { SQL } from "sql-template-strings";
import db from "../db/db";

const dbcon = db.getConnection();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validate = async (uuid: string, email: string) => {
  const { rows } = await dbcon.query(
    SQL`SELECT * FROM users WHERE uuid=${uuid}`
  );
  const user: any = rows[0];
  if (user.email !== email) {
    throw Error("invalid request");
  }
};
