export default class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message?: string | undefined, options?: ErrorOptions | undefined) {
    super(message, options);
    this.statusCode = statusCode;
  }
} 