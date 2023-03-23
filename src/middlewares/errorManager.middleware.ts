import { Errback, Request, Response, NextFunction } from "express";

export default function errorManager(error: any, req: Request, res: Response, next: NextFunction) {
  if (error) return res.status(error?.statusCode).json({
    message: error?.message,
    status: error?.statusCode
  });
}