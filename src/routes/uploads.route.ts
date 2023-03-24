import { Router } from "express";
import { postUpload } from "../controllers/uploads.controller";
import { memoryUpload } from "../middlewares/fileUpload.middleware";

export const uploadsRoute = Router();

uploadsRoute.post("/", memoryUpload.single('file'), postUpload);