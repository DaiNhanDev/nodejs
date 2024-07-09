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

class AuthError extends ErrorResponse {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
    statusCode = HttpStatus.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}

class FobidenError extends ErrorResponse {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
    statusCode = HttpStatus.FORBIDDEN,
  ) {
    super(message, statusCode);
  }
}

export {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError,
  AuthError,
  FobidenError,
};
