import * as http from "http";
import app from "./app";
import * as logger from "./logger/logger";
import db from "./db/connection";

const port = process.env.NODE_PORT || 8080;

app.set("port", port);
const server = http.createServer(app);
server.listen(port);

server.on("listening", async () => {
  const addr = server.address();
  const dbcon = db.getConnection();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  logger.serverInfo(`Listening on ${bind}`);

  await dbcon.connect(async (err, client, release) => {
    if (err) {
      logger.dbError(`Error acquiring client: ${err.stack}`);
    }
    await client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        logger.dbError(`Error executing query: ${err.stack}`);
      }
      logger.dbInfo(`DB Connected => ${result.rows[0].now}`);
    });
  });
});

module.exports = app;
