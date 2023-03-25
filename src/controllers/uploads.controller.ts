import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";
import { S3Service } from "../cloud/s3Service";
import { ErrorMessage } from "../enums/errorMessages.enum";


export async function postUpload(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req;
    if (!file) return next(new CustomError(Status.BadRequest, ErrorMessage.InvalidFileFormat));;
    
    const s3 = new S3Service(file);
    await s3.upload();

    return res.status(Status.OK).json({fileLocationURL: s3.S3FileLocation});
    
  } catch (error) {
    console.error(error);
    next(new CustomError(Status.ServiceUnavailable, ErrorMessage.Generic))
  }
}