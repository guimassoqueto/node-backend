import { NextFunction, Request, Response } from "express";
import { Status } from "../enums/statusCodes.enum";
import { ErrorMessage } from "../enums/errorMessages.enum";
import CustomError from "../errors/CustomError.error";
import User from "../models/user.model";
import Crypt from "../utils/Crypt.class.util";

/**
 * Rota: /users  
 * Método: GET  
 * Função: retorna todos os usuários
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    // lógica de paginação
    const currentPage = parseInt(req.query.currentPage as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || Infinity;
    const totalUsers = (await User.find()).length;
    const users = await User.find().skip((currentPage - 1) * perPage).limit(perPage);

    return res.status(Status.OK).json({totalUsers, users});
  }
  catch (e){
    // apenas para ilustração
    console.error(e);
    const error = new CustomError(Status.ServiceUnavailable, ErrorMessage.Generic);
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

    if (!user) return next(new CustomError(Status.NotFound, ErrorMessage.NotFound));

    return res.status(Status.OK).json(user);
    
  } catch(e) {
    console.error(e);
    next(
      new CustomError(Status.ServiceUnavailable, ErrorMessage.Generic)
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
    const { name, email, password } = req.body;

    const emailInUse = await User.findOne({email: email}).count() !== 0;
    if (emailInUse) return next(new CustomError(Status.BadRequest, ErrorMessage.EmailAlreadyInUse));

    const user = new User({ name, email, password: await Crypt.hashString(password) });
    await user.save();

    return res.status(Status.Created).json({id: user?.id, name, email});
  }
  catch (error) {
    console.error(error);
    next(
      new CustomError(Status.InternalServerError, ErrorMessage.Generic)
    );
  }
}


/**
 * Rota: /users/:id  
 * Método: PUT  
 * Função: atualiza um usuário
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, email, password, new_password } = req.body;

    let user = await User.findById(id);
    if (!user) return next(new CustomError(Status.NotFound, ErrorMessage.NotFound));
    
    const passwordMatch = await Crypt.checkHash(password, user.password);
    if (!passwordMatch) return next(new CustomError(Status.Forbidden, ErrorMessage.InvalidPassword));
    
    user.email = email;
    user.name = name;
    user.password = await Crypt.hashString(new_password);
    user.save();

    return res.status(Status.OK).json(user);
  }
  catch (error) {
    console.error(error);
    next(
      new CustomError(Status.InternalServerError, ErrorMessage.Generic)
    )
  }
}


/**
 * Rota: /users/:id  
 * Método: GET  
 * Função: retorna todos os usuários
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return next(new CustomError(Status.NotFound, ErrorMessage.NotFound));

    return res.status(Status.NoContent).json();
  }
  catch (e){
    // apenas para ilustração
    console.error(e);
    const error = new CustomError(Status.ServiceUnavailable, ErrorMessage.Generic);
    next(error);
  }
}
