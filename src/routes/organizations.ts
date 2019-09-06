import { Request, Response, Router } from "express";
import * as jwtUtils from "../utils/jwt";
import { jwtVerify } from "../middleware/jwtVerify";
import * as user from "../models/users";

const orgsRouter = Router();

orgsRouter.post(
  "/:orgname/comments/",
  [jwtVerify],
  (req: Request, res: Response) => {}
);

orgsRouter.get("/:orgname/comments/", (req, res) => {});

orgsRouter.delete(
  "/:orgname/comments/",
  [jwtVerify],
  (req: Request, res: Response) => {}
);

orgsRouter.get("/:orgname/members/", (req, res) => {});

export default orgsRouter;
