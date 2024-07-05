import { get } from "lodash";
import { shopRepository } from "../repositories/shop.repository";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/customDefinition";
import { IKeys } from "types";

const requireUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyStore: IKeys | null | undefined = get(req, "keyStore");
    console.log('=====> keyStore', keyStore);
    if (!keyStore) {
      return res.status(401).json({ code: 401, message: "UNAUTHORIZED" });
    }
    return next();
  } catch (err) {
    let msg = "Internal Server Error";
    let status = 400;
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(status).json({ code: status, message: msg });
  }
};
export default requireUser;
