import { Router } from "express";
import { getUser, getAllUsers, postUser } from "../controllers/users.controller";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";

export const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/", validateRequestBody, postUser);
usersRoute.get('/:id', getUser);
