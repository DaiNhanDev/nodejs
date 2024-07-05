import { NextFunction, Request, Response } from "express";
import { IApiKeys } from "types/apiKey";
import { IKeys } from "types/keys";

export interface CustomRequest extends Request {
  objKey?: IApiKeys | null;
  keyStore?: IKeys | null;
}

export interface customError extends Error {
  statusCode: number;
}

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
