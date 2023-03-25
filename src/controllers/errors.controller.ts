import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";
import { ErrorMessage } from "../enums/errorMessages.enum";

export function getError(req: Request, res: Response, next: NextFunction) {
  try {
    const error = new CustomError(Status.ServiceUnavailable, ErrorMessage.Generic);
    throw error;
  }
  catch (error) {
    next (error);
  }
}