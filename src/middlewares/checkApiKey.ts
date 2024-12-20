import { NextFunction, Response } from "express";
import { apiKeyRepository } from "../repositories/apiKey.repository";
import { CustomRequest } from "types/customDefinition";

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
    const objKey = await apiKeyRepository.findOne({ key, status: true });
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
