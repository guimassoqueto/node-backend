import { Request, Response, NextFunction } from "express";
import { Status } from "../enums/statusCodes.enum";

export default function postAuth(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  return res.status(Status.OK).json({email, password})
}