import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { Status } from '../enums/statusCodes.enum';

interface IError {
  error: string;
}

function validateField(key: string, value: any): IError | null {

    if (key == "name") {
      if ( !validator.isLength((value as string).trim(), { min: 3, max: 50 }) ) return { error: "Invalid name"};
    }
      
    if (key == "email") {
      if ( !validator.isEmail((value as string).trim()) ) return { error: "Invalid email"};
    }
      
    if (key == "password") {
      if( !validator.isStrongPassword(value as string) ) return { error: "Invalid password"};
    }

    if (key == "new_password") {
      if( !validator.isStrongPassword(value as string) ) return { error: "Weak new password. Try another."};
    }
      
    return null
}



export default function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  let errorsSet = new Set(); 

  for (const [key, value] of Object.entries(req.body)) {
    errorsSet.add(validateField(key, value));
  }
  errorsSet.delete(null);

  const errors = Array.from(errorsSet);
  if (errors.length != 0) return res.status(Status.BadRequest).json(errors);

  next();
}