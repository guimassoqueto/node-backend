import { Request, Response, NextFunction } from 'express';

/**
 * Função: permite quaisquer origens de fazerem requições ao servidor
 */
export default function setCors(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-COntrol-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-COntrol-Allow-Headers', 'Content-Type, Authorization');
  next();
}