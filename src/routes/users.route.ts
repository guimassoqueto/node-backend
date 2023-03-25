import { Router } from "express";
import { getUser, getAllUsers, postUser, updateUser, deleteUser } from "../controllers/users.controller";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";

export const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/", validateRequestBody, postUser);
usersRoute.get('/:id', getUser);
usersRoute.put('/:id', validateRequestBody, updateUser);
usersRoute.delete('/:id', deleteUser)
