import { Router } from "express";
import { postUpload } from "../controllers/uploads.controller";
import { fileUpload } from "../middlewares/fileUpload.middleware";

export const uploadsRoute = Router();

uploadsRoute.post("/", fileUpload.single('file'), postUpload);