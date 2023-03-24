import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";

export function postUpload(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req;
    if (!file) return res.status(Status.BadRequest).json({status: "invalid file format"});

    return res.status(Status.OK).json({status: "file uploaded"});

  } catch (error) {
    console.error(error);
    next(new CustomError(Status.ServiceUnavailable, "Um erro ocorreu, tente mais tarde"))
  }
}