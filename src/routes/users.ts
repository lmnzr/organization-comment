import { Request, Response, Router } from "express";
import * as jwtUtils from "../utils/jwt";
import { jwtVerify } from "../middleware/jwtVerify";
import * as user from "../models/users";

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

userRouter.get("/accesstoken/uuid/:uuid/email/:email", async (req, res) => {
  try {
    await user.validate(req.params.uuid, req.params.email);
    const response = await createToken(req.params.uuid, req.params.email);
    res.send(response);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
});

userRouter.post("/createadmin", async (req, res) => {
  
});

export default userRouter;
