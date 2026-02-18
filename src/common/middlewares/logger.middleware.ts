import type { NextFunction, Request, Response } from 'express';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(`${request.method} at ${request.url}`);
  next();
}
