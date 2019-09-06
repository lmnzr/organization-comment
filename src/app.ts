import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import userRouter from "./routes/users";
import orgsRouter from "./routes/organizations";
import { logRequest } from "./middleware/logRequest";

class App {
  public express: express.Application;

  // array to hold users
  private logger: any;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(logRequest);
  }

  private routes(): void {
    this.express.get("/health", (req, res) => {
      res.send({ s: 200, m: "Server Is Live" });
    });

    // user route
    this.express.use("/user", userRouter);

    // orgs route
    this.express.use("/orgs", orgsRouter);

    // handle undefined routes
    this.express.use("*", (req, res) => {
      res.send("invalid address");
    });
  }
}

export default new App().express;
