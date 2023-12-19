type ErrorType =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "INTERNAL SERVER ERROR";

export class ErrorHandler extends Error {
  statusCode: ErrorType;
  message: string;
  cause: any;
  status?: number;
  constructor(data: { statusCode: ErrorType; message: string; cause?: any }) {
    super();
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.cause = data.cause;
    this.updateStatus(data.statusCode);
  }

  updateStatus(status: ErrorType) {
    if (status === "BAD_REQUEST") {
      this.status = 400;
    } else if (status === "FORBIDDEN") {
      this.status = 403;
    } else if (status === "NOT_FOUND") {
      this.status = 404;
    } else {
      this.status = 500;
    }
  }
}
