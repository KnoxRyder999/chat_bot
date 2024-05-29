import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('you are here little user! ');
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log('🙀 ~ getAllUsers ~ error:', error);
    return res.status(500).json({ message: 'OK', cause: error });
  }
};
