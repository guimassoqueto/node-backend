import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { Status } from '../enums/statusCodes.enum';

type RequestBody = {
  name: string,
  email: string
}

interface iError {
  error: string;
  invalidField: string;
}

/**
 * Função: valida se o corpo da requisição é válido
 */
export default function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  const { name, email }: RequestBody = req.body;
  let errors: iError[] = [];

  if (!validator.isEmail(email.trim())) errors.push({error: "email inválido", invalidField: "email"});
  if (validator.isEmpty(name.trim())) errors.push({error: "nome vazio", invalidField: "nome"});
  
  if (errors.length) return res.status(Status.BadRequest).json(errors);
  next();
}