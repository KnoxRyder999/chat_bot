import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidation = [
  body('email').trim().isEmail().withMessage('Must be a valid email'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must have 6 characters min'),
];

export const signupValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  ...loginValidation,
];

export const chatCompletionValidator = [
  body('message').notEmpty().withMessage('Message is required'),
];
