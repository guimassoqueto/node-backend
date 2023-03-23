import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";

export function getError(req: Request, res: Response, next: NextFunction) {
  try {
    const error = new CustomError(Status.ServiceUnavailable, "There is an unknown error");
    throw error;
  }
  catch (error) {
    next (error);
  }
}