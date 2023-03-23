import { NextFunction, Request, Response } from "express";
import { Status } from "../enums/statusCodes.enum";
import CustomError from "../errors/CustomError.error";
import User from "../models/user.model";

/**
 * Rota: /user  
 * Método: GET  
 * Função: retorna todos os usuários
 */
export function getAllUsers(req: Request, res: Response) {
  const mock = [
    {name: "Oseas", age: 15},
    {name: "Clovis", age: 12},
    {name: "Nestor", age: 8}
  ]

  return res.status(Status.OK).json(mock);
}


/**
 * Rota: /user/:id  
 * Método: GET  
 * Função: retorna um usuário
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new CustomError(Status.NotFound, "User Not Found");
    }

    return res.status(Status.OK).json(user);
    
  } catch(error) {
    next(error);
  }
}


/**
 * Rota: /user  
 * Método: POST  
 * Função: insere um usuário
 */
export async function postUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email })
    await user.save();

    return res.status(Status.Created).json({id: user?.id, name, email});
  }
  catch (error) {
    console.error(error)
    return res.status(Status.ServiceUnavailable).json({message: "Something went wrong"});
  }
}