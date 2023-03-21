import { Router } from "express";
import { getUser, getAllUsers, postUser } from "../controllers/users.controller";

export const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.post("/", postUser);
usersRoute.get('/:id', getUser);
