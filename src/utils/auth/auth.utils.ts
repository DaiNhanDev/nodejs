import { NextFunction, Response } from "express";
// import crypto from 'crypto';
import JWT from "jsonwebtoken";
import { apiKeyRepository } from "../../repositories/apiKey.repository";
import { CustomRequest } from "types/customDefinition";

export const createTokenPair = async (payload, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    // JWT.verify(accessToken, publicKey, (error, decode) => {
    //   if (error) {
    //     console.log("=====> verify error", error);
    //   } else {
    //     console.log("=====> verify: ", decode);
    //   }
    // });
    return { accessToken, refreshToken };
  } catch (error) {}
};

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export const apiKey = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "FOBIDDEN",
      });
    }
    // await apiKeyRepository.create({
    //   key: crypto.randomBytes(64).toString('hex'),
    //   permissions: ['0000'],
    //   status: true
    // })
    const objKey = await apiKeyRepository.findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "FOBIDDEN",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};

export const checkPermission = (permission) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "permission denied",
      });
    }
    return next();
  };
};
