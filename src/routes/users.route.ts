import { Router } from "express";
import { getUser, getAllUsers, postUser, updateUser, deleteUser } from "../controllers/users.controller";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import checkRequestBodyKeys from "../middlewares/checkRequestBodyKeys.middleware";
import isAuth from "../middlewares/isAuth.middleware";

export const usersRoute = Router();

usersRoute.get("/", isAuth, getAllUsers);
usersRoute.post("/", checkRequestBodyKeys(["name", "email", "password"]), validateRequestBody, postUser);
usersRoute.put('/:id', checkRequestBodyKeys(["name", "email", "password"]), validateRequestBody, updateUser);
usersRoute.get('/:id', getUser);
usersRoute.delete('/:id', deleteUser)
