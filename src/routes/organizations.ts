/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, Router } from "express";
import { jwtVerify } from "../middleware/jwtVerify";
import { jwtCheck } from "../middleware/jwtCheck";
import * as model from "../models/comments";
import * as org from "../github-api/organizations";
import * as logger from "../logger/logger";

const orgsRouter = Router();

orgsRouter.post(
  "/:org/comments/",
  [jwtCheck],
  async (req: Request, res: Response) => {
    try {
      await org.getOrganization(req.params.org);
    } catch (err) {
      logger.apiError({ error: "invalid organization" });
      res.status(500).send({ error: "invalid organization" });
    }
    try {
      const row = await model.insertComment(
        req.params.email,
        req.params.org,
        req.body.comment
      );
      res.send(row);
    } catch (err) {
      logger.apiError({ error: err.message });
      res.status(500).send({ error: err.message });
    }
  }
);

orgsRouter.get("/:org/comments/", async (req, res) => {
  try {
    const comments = await model.listComment(req.params.org);
    const selected = comments.map((entry: any) => {
      return Object.assign(
        {},
        {
          email: entry.email,
          organization: entry.organization,
          comment: entry.comment,
          createdAt: entry.createdAt
        }
      );
    });
    res.send({ data: selected });
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(500).send({ error: err.message });
  }
});

orgsRouter.delete(
  "/:org/comments/",
  [jwtVerify],
  async (req: Request, res: Response) => {
    try {
      const comments = await model.deleteComments(
        req.params.org,
        req.params.uuid
      );
      res.send(comments);
    } catch (err) {
      logger.apiError({ error: err.message });
      res.status(500).send({ error: err.message });
    }
  }
);

orgsRouter.get("/:org/members/", (req, res) => {
  const page = req.query.page || 1;
  const entry = req.query.per_page || 10;
  org
    .getMembers(req.params.org, page, entry)
    .then((list: any) => {
      org
        .mapMemberDetail(list.data)
        .then((mappedList: any) => {
          const sorted = mappedList.sort((entry1: any, entry2: any) => {
            return entry2.followers - entry1.followers;
          });
          const selected = sorted.map((entry: any) => {
            return Object.assign(
              {},
              {
                login: entry.login,
                avatar_url: entry.avatar_url,
                followers: entry.followers,
                following: entry.following
              }
            );
          });
          res.send({ data: selected });
        })
        .catch((err: any) => {
          logger.apiError({ error: err.message });
          res.status(500).send({ error: err.message });
        });
    })
    .catch((err: any) => {
      logger.apiError({ error: err.message });
      res.status(500).send({ error: err.message });
    });
});

orgsRouter.get("/list/", async (req, res) => {
  try {
    const since = req.query.since || 1;
    const entry = req.query.per_page || 10;
    const orgs = await org.getOrganizations(since, entry);
    res.send({ data: orgs.data });
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(500).send({ error: err.message });
  }
});

export default orgsRouter;
