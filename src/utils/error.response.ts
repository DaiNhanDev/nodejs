import HttpStatus from "http-status-codes";

class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.CONFLICT),
    statusCode = HttpStatus.CONFLICT,
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    statusCode = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

class AuthenError extends ErrorResponse {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    statusCode = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export { ErrorResponse, ConflictRequestError, BadRequestError, AuthenError };
