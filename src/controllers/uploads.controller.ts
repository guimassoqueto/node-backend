import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";
import { s3Client } from "../cloud/s3Client.cloud";
import { AWS_S3_BUCKET } from "../settings";
import { v4 as uuid4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface IParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
  ACL: "private"|"public-read"|"public-read-write";
}

function getParams(file: Express.Multer.File): IParams {
  return {
    Bucket: AWS_S3_BUCKET,
    Key: file.filename,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  }
}

function getFileUrl(file: Express.Multer.File) {
  return `https://${AWS_S3_BUCKET}.s3.us-east-2.amazonaws.com/${file.filename}`;
}

export async function postUpload(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req;
    if (!file) return res.status(Status.BadRequest).json({status: "invalid file format"});
    
    file.filename = `${uuid4()}.${file.mimetype.split("/").pop()}`;

    const params = getParams(file);
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return res.status(Status.OK).json({status: "file uploaded", url: getFileUrl(file)});
    
  } catch (error) {
    console.error(error);
    next(new CustomError(Status.ServiceUnavailable, "Um erro ocorreu, tente mais tarde"))
  }
}