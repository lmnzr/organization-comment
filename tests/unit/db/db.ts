/* eslint-disable @typescript-eslint/explicit-function-return-type */
import db from "../../../src/db/connection";
import * as dbcon from "../../../src/db/query";

describe("Database Query", () => {
  test("connected to DB", async done => {
    expect(await db.getConnection().connect()).not.toThrow;
    done();
  });

  test("query with parameter", async done => {
    const user: any = await dbcon.queryWithParam(
      `SELECT * FROM "users" WHERE "email" = $1`,
      ["admin@system.com"]
    );
    const data = user.rows[0];
    expect(data.uuid).toEqual("a5678438-38d6-11e9-b1ca-7d1685deabce");
    expect(data.name).toEqual("admin");
    done();
  });

  test("query with empty parameter", async done => {
    try {
      await dbcon.queryWithParam(
        `SELECT * FROM "users" WHERE "email" = $1`,
        []
      );
    } catch (error) {
      expect(error.message).toMatch("Database query params is empty");
      done();
    }
  });

  test("query with false parameter", async done => {
    const user = await dbcon.queryWithParam(
      `SELECT * FROM "users" WHERE "email" = $1`,
      ["unknown"]
    );

    expect(user.rowCount).toEqual(0);
    done();
  });

  test("query without parameter", async done => {
    const user: any = await dbcon.query(
      `SELECT * FROM "users" WHERE "email" = 'admin@system.com'`
    );
    const data = user.rows[0];
    expect(data.uuid).toEqual("a5678438-38d6-11e9-b1ca-7d1685deabce");
    expect(data.name).toEqual("admin");
    done();
  });
});
