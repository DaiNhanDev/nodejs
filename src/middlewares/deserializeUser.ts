import { Response, NextFunction } from "express";
import { get } from "lodash";
import { verify } from "../utils/jwt";
import { CustomRequest } from "../types/customDefinition";
import { keyRepository } from "../repositories/keys.repository";

const HEADERS = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTONKEN: "refreshToken",
};

const deserializeUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = get(req, "headers.authorization");

  const userId = req.headers[HEADERS.CLIENT_ID];

  if (!userId) return next();

  const keyStore = await keyRepository.findUserById(userId);
  if (!keyStore) return next();

  let token = bearerToken;

  if (bearerToken && bearerToken.startsWith("Bearer")) {
    token = bearerToken.substring(7);
  }
  if (!token) return next();

  const { decoded, expired, valid } = verify(token, keyStore.privateKey);
  if (valid && !expired && decoded?.userId === userId) {
    req.keyStore = keyStore;
    req.user = decoded;
    return next();
  } else {
    return res.status(401).json({
      code: 401,
      message: expired ? "JWT_EXPIRED" : "UNAUTHORIZED",
    });
  }
};

export default deserializeUser;
