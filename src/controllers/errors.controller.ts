import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.error";
import { Status } from "../enums/statusCodes.enum";
import { Message } from "../enums/Messages.enum";

/**
 * 
 * Rota de teste que retorna erro sempre que for chamada, utilizada para fins de teste
 */
export function getError(req: Request, res: Response, next: NextFunction) {
  try {
    const error = new CustomError(Status.ServiceUnavailable, Message.GenericError);
    throw error;
  }
  catch (error) {
    next (error);
  }
}