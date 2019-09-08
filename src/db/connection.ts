import { Pool } from "pg";
import { ConnectionStringParser } from "connection-string-parser";

export default class Connection {
  public connection: Pool;
  private static instance: Connection;

  private constructor() {
    const connectionObj: any = this.parse(process.env.DATABASE_URL as string);
    this.connection = new Pool({
      max: 10,
      host: connectionObj.hosts[0].host,
      user: connectionObj.username,
      password: connectionObj.password,
      database: connectionObj.endpoint
    });
  }

  public static getConnection(): Pool {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }

    return Connection.instance.connection;
  }

  private parse(conString: string): any {
    const connectionStringParser = new ConnectionStringParser({
      scheme: "postgres",
      hosts: []
    });
    return connectionStringParser.parse(conString);
  }
}
