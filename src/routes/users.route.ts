import { Router } from "express";
import { getUser, getAllUsers, postUser, updateUser, deleteUser } from "../controllers/users.controller";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import isAuth from "../middlewares/isAuth.middleware";
import requiredReqBodyKeys from "../middlewares/requiredReqBodyKeys.middleware";

export const usersRoute = Router();

usersRoute.get("/", isAuth, getAllUsers);
usersRoute.post("/", requiredReqBodyKeys(["name", "email", "password"]), validateRequestBody, postUser);
usersRoute.put('/:id', requiredReqBodyKeys(["name", "email", "password"]), validateRequestBody, updateUser);
usersRoute.get('/:id', getUser);
usersRoute.delete('/:id', deleteUser)
