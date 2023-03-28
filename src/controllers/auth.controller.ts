import { Request, Response, NextFunction } from "express";
import { Message } from "../enums/Messages.enum";
import { Status } from "../enums/statusCodes.enum";
import CustomError from "../errors/CustomError.error";
import User from "../models/user.model";
import Crypt from "../utils/classes/Crypt.class.util";
import { generateUserToken } from "../utils/functions/token.util";

/**
 * Rota: /auth  
 * Método: POST  
 * Função: authentica o usuário e gera um token
 */
export default async function postAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    if (!user) return next(new CustomError(Status.NotFound, Message.ResourceNotFound));

    const isPasswordMatch = await Crypt.checkHash(password, user.password);
    
    if (!isPasswordMatch) return next(new CustomError(Status.Forbidden, Message.InvalidPassword));
    
    const token = generateUserToken(user, "15m");
    res.setHeader("Authentication", `Bearer ${token}`);
    
    return res.status(Status.OK).json({ status: Status.OK, message: "User authenticated", token });
    
  } catch (error) {
    console.error(error);
    next(new CustomError(Status.InternalServerError, Message.GenericError))
  }

}