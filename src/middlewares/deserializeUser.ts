import { Response, NextFunction } from "express";
import { get } from "lodash";
import { verify } from "../utils/jwt";
import { CustomRequest } from "../types/customDefinition";
import { keyRepository } from "../repositories/keys.repository";

const HEADERS = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
};

const deserializeUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = get(req, "headers.authorization");
  const userId = req.headers[HEADERS.CLIENT_ID];
  console.log('====> userId', userId);

  if (!userId) return next();

  const keyStore = await keyRepository.findUserById(userId);
  console.log('====> keyStore', keyStore);
  if (!keyStore) return next();

  let token = bearerToken;

  if (bearerToken && bearerToken.startsWith("Bearer")) {
    token = bearerToken.substring(7);
  }
  if (!token) return next();

  const { decoded, expired, valid } = verify(token, keyStore.publicKey);
  if (valid && !expired && decoded?.userId === userId) {
    req.keyStore = keyStore;
    return next();
  } else {
    return res.status(401).json({
      code: 401,
      message: expired ? "JWT_EXPIRED" : "UNAUTHORIZED",
    });
  }
};

export default deserializeUser;
