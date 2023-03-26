import { Router } from "express";
import postAuth from "../controllers/auth.controller";
import checkRequestBodyKeys from "../middlewares/checkRequestBodyKeys.middleware"

export const authRoute = Router();

authRoute.post("/", checkRequestBodyKeys(["email", "password"]), postAuth);