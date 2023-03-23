import { NextFunction, Request, Response } from "express";
import { Status } from "../enums/statusCodes.enum";
import CustomError from "../errors/CustomError.error";
import User from "../models/user.model";

/**
 * Rota: /users  
 * Método: GET  
 * Função: retorna todos os usuários
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const allUsers = await User.find();
    return res.status(Status.OK).json(allUsers);
  }
  catch (e){
    // apenas para ilustração
    console.error(e);

    const error = new CustomError(Status.ServiceUnavailable, "Ocorreu um erro, tente mais tarde");
    next(error);
  }
}


/**
 * Rota: /users/:id  
 * Método: GET  
 * Função: retorna um usuário
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return next(new CustomError(Status.NotFound, "User Not Found"));

    return res.status(Status.OK).json(user);
    
  } catch(e) {
    console.error(e);
    next(
      new CustomError(Status.ServiceUnavailable, "Ocorreu um erro, tente mais tarde")
    );
  }
}


/**
 * Rota: /users  
 * Método: POST  
 * Função: insere um usuário
 */
export async function postUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email })
    await user.save();

    return res.status(Status.Created).json({id: user?.id, name, email});
  }
  catch (error) {
    console.error(error);
    next(
      new CustomError(Status.InternalServerError, "Ocorreu um erro, tente mais tarde")
    );
  }
}

/**
 * Rota: /users  
 * Método: PUT  
 * Função: atualiza um usuário
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    let user = await User.findById(id);
    if (!user) return next(new CustomError(Status.NotFound, "User Not Found"));
    
    // precisa melhorar esta lógica
    user.name = name;
    user.email = email;
    user.save();

    return res.status(Status.OK).json(user);
  }
  catch (error) {
    console.error(error);
    next(
      new CustomError(Status.InternalServerError, "Ocorreu um erro, tente mais tarde")
    )
  }
}