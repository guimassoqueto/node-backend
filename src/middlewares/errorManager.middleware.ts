import { Request, Response, NextFunction } from "express";

/**
 * Middleware final que trata os erros na aplicação
 * @param error erro ocorrido durante determinada etapa do processo, geralmente em controllers
 * @param req a requisição do cliente
 * @param res a resposta ao cliente
 * @param next next
 * @returns status + mensagen de retorno ao cliente
 */
export default function errorManager(error: any, req: Request, res: Response, next: NextFunction) {
  if (error) return res.status(error?.statusCode).json({
    message: error?.message,
    status: error?.statusCode
  });
}