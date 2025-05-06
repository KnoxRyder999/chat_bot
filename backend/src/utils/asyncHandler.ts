import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export const asyncHandler =
  (fn: AsyncHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
// This function is a middleware that handles async errors in Express.
// It takes an async function as an argument and returns a new function that
// calls the async function with the request, response, and next parameters.
// If the async function throws an error, it catches the error and passes it to the next middleware.
// This allows you to avoid writing try-catch blocks in every route handler.
