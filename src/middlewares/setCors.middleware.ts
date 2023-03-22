import { Request, Response, NextFunction } from 'express';

/**
 * Função: permite quaisquer origens de fazerem requições ao servidor
 */
export default function setCors(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}