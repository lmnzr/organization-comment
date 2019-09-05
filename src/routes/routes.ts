import { Router } from "express";
import * as loggerFactory from "../factory/loggerFactory";
import * as tokenizer from "../middleware/jwt";

const router = Router();
const logger = loggerFactory.createLogger(loggerFactory.Type.API);

router.get("/token/username/:username/userid/:userid", (req, res) => {
  const obj: tokenizer.Payload = {
    userId: parseInt(req.params.userid),
    userName: req.params.username
  };
  const response = tokenizer.createJwt(obj);
  const json: any = {
    url: req.url,
    requestParams: req.params,
    requestBody: req.body,
    requestHeader: req.headers,
    response: response
  };

  logger.info(JSON.stringify(json));
  res.send(response);
});

export default router;
