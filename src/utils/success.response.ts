import { Response } from "express";
import HttpStatus from "http-status-codes";
import { RESPONSE_MESSAGE } from "../constants/response";

class SuccessResponse<T> {
  message: string;
  status: number;
  metadata: T;

  constructor({
    message = "",
    statusCode = HttpStatus.OK,
    reasonStatusCode = RESPONSE_MESSAGE.OK,
    metadata,
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK<T> extends SuccessResponse<T> {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED<T> extends SuccessResponse<T> {
  options;
  constructor({
    message = "",
    statusCode = HttpStatus.CREATED,
    reasonStatusCode = RESPONSE_MESSAGE.OK,
    metadata,
    // options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    // this.options = options;
  }
}

class NO_CONTENT<T> extends SuccessResponse<T> {
  constructor({
    message = "",
    statusCode = HttpStatus.NO_CONTENT,
    reasonStatusCode = HttpStatus.getStatusText(HttpStatus.NO_CONTENT),
    metadata = null,
    // options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

export { SuccessResponse, OK, CREATED, NO_CONTENT };
