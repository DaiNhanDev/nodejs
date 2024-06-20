import { NextFunction, Request, Response } from "express";
import { ControllerFunction } from "../types/customDefinition";

export function catchError(fn: ControllerFunction) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
}
