import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';

export const createToken = (
  id: string,
  email: string,
  expiresIn: string
): string => {
  if (!id) {
    throw new Error('User ID not set');
  }
  if (!email) {
    throw new Error('User email not set');
  }

  const payload = { id, email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not set');
  }

  if (!expiresIn) {
    throw new Error('Token expiration time not set');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '7d' }); // 7 days);
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === '') {
    res.status(401).json({ message: 'Token Not Received' });
    return;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'JWT_SECRET not set' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token Expired or Invalid' });
    } else {
      res.locals.jwtData = decoded;
      next();
    }
  });
};
