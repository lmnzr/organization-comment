import { Pool } from "pg";
import { ConnectionStringParser } from "connection-string-parser";

export default class Db {
  public connection: Pool;
  private static instance: Db;

  private constructor() {
    const connectionObj: any = this.parse(process.env.DATABASE_URL as string);
    this.connection = new Pool({
      max: 10,
      host: connectionObj.hosts[0].host,
      user: connectionObj.username,
      password: connectionObj.password,
      database: connectionObj.scheme
    });
  }

  public static getConnection(): Pool {
    if (!Db.instance) {
      Db.instance = new Db();
    }

    return Db.instance.connection;
  }

  private parse(conString: string): any {
    const connectionStringParser = new ConnectionStringParser({
      scheme: "postgres",
      hosts: []
    });
    return connectionStringParser.parse(conString);
  }
}
