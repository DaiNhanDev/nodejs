import { NextFunction, Request, Response } from "express";
import { IApiKeys } from "types/apiKey";

export interface CustomRequest extends Request {
  objKey?: IApiKeys | null;
}

export interface customError extends Error {
  statusCode: number;
}

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
