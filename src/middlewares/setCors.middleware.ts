import { Request, Response, NextFunction } from 'express';

interface CORSheaders {
  "Access-Control-Allow-Origin"?: string;
  "Access-Control-Allow-Credentials"?: string;
  "Access-Control-Allow-Headers"?: string;
  "Access-Control-Allow-Methods"?: string;
  "Access-Control-Expose-Headers"?: string,
  "Access-Control-Max-Age"?: number;
  "Access-Control-Request-Headers"?: string;
  "Access-Control-Request-Method"?: string;
  "Origin"?: string;
  "Timing-Allow-Origin"?: string;
}

export default function setCors(options: CORSheaders) {
  return (req: Request, res: Response, next: NextFunction) => {
    ("Access-Control-Allow-Origin" in options) && res.setHeader("Access-Control-Allow-Origin", <any>options["Access-Control-Allow-Origin"]);
    ("Access-Control-Allow-Credentials" in options) && res.setHeader("Access-Control-Allow-Credentials", <any>options["Access-Control-Allow-Credentials"]);
    ("Access-Control-Allow-Headers" in options) && res.setHeader("Access-Control-Allow-Headers", <any>options["Access-Control-Allow-Headers"]);
    ("Access-Control-Allow-Methods" in options) && res.setHeader("Access-Control-Allow-Methods", <any>options["Access-Control-Allow-Methods"]);
    ("Access-Control-Expose-Headers" in options) && res.setHeader("Access-Control-Expose-Headers", <any>options["Access-Control-Expose-Headers"]);
    ("Access-Control-Max-Age" in options) && res.setHeader("Access-Control-Max-Age", <any>options["Access-Control-Max-Age"]);
    ("Access-Control-Request-Headers" in options) && res.setHeader("Access-Control-Request-Headers", <any>options["Access-Control-Request-Headers"]);
    ("Access-Control-Request-Method" in options) && res.setHeader("Access-Control-Request-Method", <any>options["Access-Control-Request-Method"]);
    ("Origin" in options) && res.setHeader("Origin", <any>options["Origin"]);
    ("Timing-Allow-Origin" in options) && res.setHeader("Timing-Allow-Origin", <any>options["Timing-Allow-Origin"]);
    next();
  }
}


/**
 * @deprecated Evitar utilizar esta função
 */
function oldSetCors(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}