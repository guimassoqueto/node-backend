import { Request, Response } from "express";
import { Status } from "../utils/statusCodes.util";
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
export function getUser(req: Request, res: Response) {
  const { id } = req.params;
  return res.status(Status.OK).json({id: id});
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

    return res.status(Status.Created).json({user: { name, email }});
  }
  catch (error) {
    console.error(error)
    return res.status(Status.ServiceUnavailable).json({message: "Something went wrong"});
  }
}