import * as http from "http";
import app from "./app";
import * as loggerFactory from "./factory/loggerFactory";

const port = process.env.PORT || 3070;

const serverLogger = loggerFactory.createLogger(loggerFactory.Type.SERVER);

app.set("port", port);
const server = http.createServer(app);
server.listen(port);

server.on("listening", function(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  serverLogger.info(`Listening on ${bind}`);
});

module.exports = app;
