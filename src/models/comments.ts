/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as db from "../db/query";

export const insertComment = async (
  email: string,
  organization: string,
  comment: string
) => {
  const { rows } = await db.queryWithParam(
    `INSERT INTO "comments" ("email","organization","comment") VALUES ($1,$2,$3) RETURNING "id";`,
    [email, organization, comment]
  );
  const [row] = rows;
  return row;
};

export const listComment = async (organization: string) => {
  const { rows } = await db.queryWithParam(
    `SELECT * FROM "comments" WHERE "organization"=$1 AND "isdeleted"='false' ORDER BY "createdAt" DESC LIMIT 100;`,
    [organization]
  );
  const comments: any = rows;
  return comments;
};

export const deleteComments = async (organization: string, uuid: string) => {
  const { rows } = await db.queryWithParam(
    `UPDATE "comments" SET "isdeleted" = 'true', "deletedAt" = current_timestamp , "deleterId" = $1 WHERE "organization" = $2 AND "isdeleted" = 'false' RETURNING *;`,
    [uuid, organization]
  );
  const count: any = rows.length;
  // eslint-disable-next-line @typescript-eslint/camelcase
  return { affected_rows: count };
};
