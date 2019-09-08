/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as db from "../../src/db/query";

export function downUsers() {
  return db.query(
    `TRUNCATE TABLE "users" RESTART IDENTITY;
        INSERT INTO "users"("uuid", "name", "email", "password", "isadmin") 
        VALUES ('a5678438-38d6-11e9-b1ca-7d1685deabce', 'admin', 'admin@system.com', 
        '$2b$09$i1bfvz4tuUj4L0cztd7THeh4EAI1oGrG0F9hlnkhFG9iSIa59RR6K', 't');`
  );
}

export function upComments() {
  return db.query(
    `INSERT INTO "comments"("email", "organization", "comment") VALUES ('anonymous', 'vuejs', 'good job');
        INSERT INTO "comments"("email", "organization", "comment") VALUES ('admin@system.com', 'vuejs', 'thank you for your support');`
  );
}

export function downComments() {
  return db.query(`TRUNCATE TABLE "comments" RESTART IDENTITY;`);
}
