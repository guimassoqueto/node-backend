import { Request, Response, NextFunction } from "express";
import { Message } from "../enums/Messages.enum";
import { Status } from "../enums/statusCodes.enum";
import { decodeUserToken } from "../utils/functions/token.util";

export default function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const hasAuthorizationHeader = req.headers?.authorization;
    if (!hasAuthorizationHeader) throw new Error(Message.NotAuthenticated);

    const token = req.headers.authorization!.split(' ')[1];
    const decodedToken = decodeUserToken(token as string);

    const { userId, userEmail } = decodedToken;
    req.userId = userId;
    req.userEmail = userEmail;

    next();

  } catch(error) {
    console.error(error);
    return res.status(Status.Forbidden).json({status: Status.Forbidden, message: Message.NotAuthenticated});
  }
  

}