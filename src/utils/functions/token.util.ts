import jwt from "jsonwebtoken";
import { Message } from "../../enums/Messages.enum";
import { IUser } from "../../models/user.model";
import { TOKEN_NAME } from "../../settings";

type ExpiresTime = "20s" | "1m" | "5m" | "15m" | "30m" | "1h" | "5h" | "24h"

interface decodedUser {
  userEmail: string,
  userId: string
}

export function generateUserToken(user: IUser, expiresIn: ExpiresTime) {
 const token = jwt.sign({
    userEmail: user.email,
    userId: user._id
  }, TOKEN_NAME, { expiresIn });

  return token;
}

export function decodeUserToken(token: string) {
  const user = jwt.verify(token as string, TOKEN_NAME);
  if (!user) throw new Error(Message.NotAuthenticated);
  return user as decodedUser;
}