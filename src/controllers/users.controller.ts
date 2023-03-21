import { Request, Response } from "express";
import { Status } from "../utils/statusCodes.util";
import checkPostUser from "../utils/checkPostUser.util";


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
export function postUser(req: Request, res: Response) {
  return res.status(Status.Created).json({user: req.body});
}