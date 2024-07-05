import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import { ErrorResponse } from "../utils/error.response";
import { customError } from "../types/customDefinition";

/**
 * Error Handler Middleware
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (
  error: customError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('=====> error', error);
  if (!(error instanceof ErrorResponse)) {
    const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
    error = new ErrorResponse(message, statusCode);
  }

  const { statusCode, message } = error;

  res.locals.errorMessage = error.message;

  const response = {
    code: statusCode,
    message,
    status: "error",
  };

  res.status(statusCode).send(response);
};

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}
