import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { IApiKeys } from "types/apiKey";
import { IKeys } from "types/keys";

export interface CustomRequest<T = any> extends Request {
  objKey?: IApiKeys | null;
  keyStore?: IKeys | null;
  user: {
    email: string;
    userId: Types.ObjectId;
  };
  body: T;
}

export interface customError extends Error {
  statusCode: number;
}

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
