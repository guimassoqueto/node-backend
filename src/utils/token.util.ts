import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

type ExpiresTime = "20s" | "1m" | "5m" | "15m" | "30m" | "1h" | "5h" | "24h"

export default function generateUserToken(user: IUser, expiresIn: ExpiresTime) {
 const token = jwt.sign({
    email: user.email,
    userId: user._id
  }, 'secret', { expiresIn });

  return token;
}