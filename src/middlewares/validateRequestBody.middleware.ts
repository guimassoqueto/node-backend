import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { Status } from '../enums/statusCodes.enum';

/**
 * Função: verifica se as chaves necessárias (email e name) encontram-se em req.body
 */
function isBodyValid(req: Request): boolean{
  const expectedKeys = ["name", "email"]; // a medida que mais chaves forem sendo adicionadas, modificar aqui
  for (const key of expectedKeys) {
    if (!(key in req.body)) return false;
  }
  return true;
}

/**
 * Função: valida se o corpo da requisição é válido
 */
export default function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  if (!isBodyValid(req)) {
    return res.status(Status.BadRequest).json([{error: "corpo inválido"}])
  }
  
  const { name, email } = req.body;

  let errors: object[] = [];
  if (!validator.isEmail(email.trim())) errors.unshift({error: "email inválido"})
  if (!validator.isLength(name.trim(), { min: 3, max: 50 })) errors.unshift({error: "nome inválido"})

  if (errors.length) return res.status(Status.BadRequest).json(errors); 
  next();
}