import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import * as loggerFactory from "./factory/loggerFactory";
import routes from "./routes/routes";

class App {
  public express: express.Application;

  // array to hold users
  private logger: any;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = loggerFactory.createLogger(loggerFactory.Type.API);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/", (req, res) => {
      this.logger.info(`url:::::::${req.url}`);
      res.send("My API works!!!");
    });

    // user route
    this.express.use("/", routes);

    // handle undefined routes
    this.express.use("*", (req, res) => {
      res.send("invalid address");
    });
  }
}

export default new App().express;
