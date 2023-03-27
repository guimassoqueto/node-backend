import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "../enums/errorMessages.enum";
import { Status } from "../enums/statusCodes.enum";
import CustomError from "../errors/CustomError.error";
import User from "../models/user.model";
import Crypt from "../utils/Crypt.class.util";
import jwt from "jsonwebtoken";
import generateUserToken from "../utils/token.util";

export default async function postAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({email: email});
    if (!user) return next(new CustomError(Status.NotFound, ErrorMessage.NotFound));

    const isPasswordMatch = await Crypt.checkHash(password, user.password);
    
    if (!isPasswordMatch) return next(new CustomError(Status.Forbidden, ErrorMessage.InvalidPassword));
    
    const token = generateUserToken(user, "20s");
    
    return res.status(Status.OK).json({ status: Status.OK, message: "User authenticated", token })
    
  } catch (error) {
    console.log(error);
    next(new CustomError(Status.InternalServerError, ErrorMessage.Generic))
  }

}