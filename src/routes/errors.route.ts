import { Router } from "express";
import { getError } from "../controllers/errors.controller";

export const errorsRoute = Router();

errorsRoute.get("/", getError);

