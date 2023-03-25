import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";
import { S3Service } from "../cloud/s3Service";


export async function postUpload(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req;
    if (!file) return res.status(Status.BadRequest).json({status: "invalid file format"});
    
    const s3 = new S3Service(file);
    await s3.upload();

    return res.status(Status.OK).json({status: "file uploaded", url: s3.S3FileLocation});
    
  } catch (error) {
    console.error(error);
    next(new CustomError(Status.ServiceUnavailable, "Um erro ocorreu, tente mais tarde"))
  }
}