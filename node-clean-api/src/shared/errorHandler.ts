import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Avoid leaking sensitive info
  console.error(err.message);
  return res.status(400).json({ message: err.message || 'Unexpected error' });
};
