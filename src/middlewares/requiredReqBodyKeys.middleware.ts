import { Request, Response, NextFunction } from "express";
import { Message } from "../enums/Messages.enum";
import { Status } from "../enums/statusCodes.enum";


/**
 * Função: checar se a requisição contem os campos experados em req.body  
 * Se houverem mais campos que o esperado, retorna falso
 * Sa as chaves esperadas não estiverem no corpo da requisição retorna falso
 * @param expectedKeys quais campos são obrigatórios no corpo da requisição  
 * @param req request
 * @returns boolean,  se as chaves esperadas estão no corpo da requisição
 */
function check(expectedKeys: string[], req: Request): boolean{
  if (expectedKeys.length !== Object.keys(req.body).length) return false;

  for (const key of expectedKeys) {
    if (!(key in req.body)) return false;
  }

  return true;
}

export default function requiredReqBodyKeys(expectedKeys: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = check(expectedKeys, req);

    if (isValid) return next();
    
    return res.status(Status.BadRequest).json({status: Status.BadRequest, error: Message.InvalidRequestBody});
  }
}
