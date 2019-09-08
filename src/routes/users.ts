import { Router } from "express";
import * as jwtUtils from "../utils/jwt";
import * as user from "../models/users";
import * as logger from "../logger/logger";

const userRouter = Router();

const createToken = (uuid: string, email: string): any => {
  try {
    const obj: jwtUtils.Payload = {
      uuid: uuid,
      email: email
    };
    const response = jwtUtils.createJwt(obj);
    return { token: response };
  } catch (err) {
    throw Error("tokenizer failed");
  }
};

userRouter.post("/accesstoken/", async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("only allowed using user email");
    }
    if (!req.body.password) {
      throw new Error("only allowed using user password");
    }
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(400);
    res.send({ error: err.message });
  }

  try {
    const userData: any = await user.validate(
      req.body.email,
      req.body.password
    );
    const response = await createToken(userData.uuid, userData.email);
    res.send(response);
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(401);
    res.send({ error: err.message });
  }
});

userRouter.post("/admin/register/", async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("only allowed using user email");
    }
    if (!req.body.password) {
      throw new Error("only allowed using user password");
    }
    if (!req.body.named) {
      throw new Error("only allowed using user name");
    }
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(400);
    res.send({ error: err.message });
  }

  try {
    res.send(
      await user.createUser(
        req.body.name,
        req.body.email,
        req.body.password,
        true
      )
    );
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(500);
    res.send({ error: err.message });
  }
});

userRouter.post("/member/register/", async (req, res) => {
  try {
    if (!req.body.email) {
      throw new Error("only allowed using user email");
    }
    if (!req.body.password) {
      throw new Error("only allowed using user password");
    }
    if (!req.body.named) {
      throw new Error("only allowed using user name");
    }
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(400);
    res.send({ error: err.message });
  }

  try {
    res.send(
      await user.createUser(
        req.body.name,
        req.body.email,
        req.body.password,
        false
      )
    );
  } catch (err) {
    logger.apiError({ error: err.message });
    res.status(500);
    res.send({ error: err.message });
  }
});

export default userRouter;
