import { Router } from "express";
import postAuth from "../controllers/auth.controller";
import requiredReqBodyKeys from "../middlewares/requiredReqBodyKeys.middleware"

export const authRoute = Router();

authRoute.post("/", requiredReqBodyKeys(["email", "password"]), postAuth);