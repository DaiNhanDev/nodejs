import HttpStatus, { ReasonPhrases } from "http-status-codes";

class ErrorResponse extends Error {
  status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, statusCode = HttpStatus.CONFLICT) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}

export {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError
}