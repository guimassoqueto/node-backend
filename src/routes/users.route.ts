import { Router } from "express";
import { getUser, getAllUsers, postUser, updateUser, deleteUser } from "../controllers/users.controller";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import checkRequestBodyKeys from "../middlewares/checkRequestBodyKeys.middleware";

export const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/", checkRequestBodyKeys(["name", "email", "password"]), validateRequestBody, postUser);
usersRoute.get('/:id', getUser);
usersRoute.put('/:id', checkRequestBodyKeys(["name", "email", "password", "new_password"]), validateRequestBody, updateUser);
usersRoute.delete('/:id', deleteUser)
