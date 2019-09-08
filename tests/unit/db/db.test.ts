import db from "../../../src/db/connection";
import * as dbcon from "../../../src/db/query";

describe("Database Connection", () => {
  it("connected to DB", async () => {
    expect(await db.getConnection().connect()).not.toThrow;
  });
});
